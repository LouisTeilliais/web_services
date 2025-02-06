import { Injectable } from "@nestjs/common";
import SessionRepositoryService from "../repositories/session.repository";
import SessionEntity from "src/utils/entities/session.entity";
import { SessionDto } from "src/sessions/models/session.dto";
import MailService from "src/mailer/mail.service";


@Injectable()
export default class SessionControllerService {

    constructor(
        private readonly sessionRepositoryService: SessionRepositoryService,
        private readonly mailService: MailService
    ) {}


    async getAllSession(title?: SessionEntity["title"], longitude?: number, latitude?: number, distance?: string) {

        const distanceNumber = distance ? parseInt(distance, 10) : undefined;
        const sessions = await this.sessionRepositoryService.findMany(title, longitude, latitude, distanceNumber);
    
        return sessions;
    }

    async getSessionById(sessionId: SessionEntity["sessionId"]) : Promise<SessionEntity> {
        const session = await this.sessionRepositoryService.findById(sessionId)

        return session
    }


    async createSession(sessionDto: SessionDto): Promise<SessionEntity> {
        return this.sessionRepositoryService.createSession(
            {
                title: sessionDto.title,
                description: sessionDto.description,
                sessionDate: sessionDto.sessionDate,
                placesRemaining: sessionDto.placesRemaining,
                placesAvailable: sessionDto.placesAvailable,
                sportId: sessionDto.sportId
            }
        )
    }

    async updateSession(sessionId: SessionEntity["sessionId"], sessionDto: SessionDto): Promise<SessionEntity> {
        return this.sessionRepositoryService.updateSession(
            sessionId,
            {
                title: sessionDto.title,
                description: sessionDto.description,
                sessionDate: sessionDto.sessionDate,
                placesRemaining: sessionDto.placesRemaining,
                placesAvailable: sessionDto.placesAvailable,
                sportId: sessionDto.sportId
            }
        )
    }

    async deleteSession(sessionId: SessionEntity["sessionId"]) {
        return this.sessionRepositoryService.deleteSession(sessionId)
    }


    async addUserToSession(sessionId: SessionEntity["sessionId"], userId: SessionEntity["userId"]) {
        
        await this.sessionRepositoryService.addUserToSession(sessionId, userId)

        const session = await this.sessionRepositoryService.findById(sessionId)
        const user = session.users.find(user => user.userId === userId)
        
        if (!user) {
            throw new Error("User not found")
        }
        
        const formattedDate = `${session.sessionDate.getDate()}:${session.sessionDate.getMonth() + 1}:${session.sessionDate.getFullYear()}:${session.sessionDate.getHours()}:${session.sessionDate.getMinutes()}`;

        await this.mailService.sendMail(
            "no-reply@gmail.com",
            user.email,
            "Confimation d'inscription à une session",
            `Votre session ${session.title.toUpperCase()} à été confirmée <br> 
            Date : ${formattedDate} <br>
            Description : ${session.description} <br>
            Sport : ${session.sport.name} <br>
            `
        )
    }

    async leaveSession(sessionId: SessionEntity["sessionId"], userId: SessionEntity["userId"]) {
        return this.sessionRepositoryService.leaveSession(sessionId, userId)
    }
}