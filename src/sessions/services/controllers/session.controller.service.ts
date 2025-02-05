import { Injectable } from "@nestjs/common";
import SessionRepositoryService from "../repositories/session.repository";
import SessionEntity from "src/utils/entities/session.entity";
import { SessionDto } from "src/sessions/models/session.dto";


@Injectable()
export default class SessionControllerService {

    constructor(private readonly sessionRepositoryService: SessionRepositoryService ) {}


    async getAllSession(): Promise<SessionEntity[]> {
        const sessions = await this.sessionRepositoryService.findMany()

        return sessions
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
        return this.sessionRepositoryService.addUserToSession(sessionId, userId)
    }

    async leaveSession(sessionId: SessionEntity["sessionId"], userId: SessionEntity["userId"]) {
        return this.sessionRepositoryService.leaveSession(sessionId, userId)
    }
}