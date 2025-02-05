import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from 'nestjs-prisma'
import SessionEntity from "src/utils/entities/session.entity";
import { Prisma } from "@prisma/client";

@Injectable()
export default class SessionRepositoryService {

    private readonly include: Prisma.SessionInclude = {
        sport: true,
        users: true
    }

    constructor(private readonly dbService: PrismaService) {}

    public async findMany(longitude?: number, latitude?: number, distance?: number) : Promise<SessionEntity[]> {
        
        // if (!longitude || !latitude || !distance) {
        //     return this.dbService.session.findMany({
        //         include: this.include
        //     })
        // }
        
        // const sessions = await this.dbService.$queryRaw`
        //     SELECT *
        //     FROM sessions
        //     WHERE ST_DWithin(
        //         location, 
        //         ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326), 
        //         ${distance * 1000}
        //     )
        // `;

        // return sessions
        
        return this.dbService.session.findMany({
            include: this.include
        })
    }

    public async findById(sessionId: SessionEntity["sessionId"]) : Promise<SessionEntity> {

        const session = await this.dbService.session.findFirst({
            where: {
                sessionId: sessionId
            },
            include: this.include
        })

        if (!session) {
            throw new NotFoundException("La session n'a pas été trouvé")
        }

        return session
    }

    public async createSession(sessionData : 
        Pick<SessionEntity, "title" | "description" | "sessionDate" | "placesRemaining" | "placesAvailable"  | "sportId">) : Promise<SessionEntity> {{
        return this.dbService.session.create({
            data: {
                title: sessionData.title,
                description: sessionData.description,
                sessionDate: sessionData.sessionDate,
                placesRemaining: sessionData.placesRemaining,
                placesAvailable: sessionData.placesAvailable,
                sport: sessionData.sportId ? { connect: { sportId: sessionData.sportId}} : undefined
            },
            include: this.include
        })
    }}


    public async updateSession(
        sessionId: SessionEntity["sessionId"], 
        sessionData: Pick<SessionEntity, "title" | "description" | "sessionDate" | "placesRemaining" | "placesAvailable" | "sportId">
    ): Promise<SessionEntity> {
        if (!sessionId) {
            throw new NotFoundException("La session n'a pas été trouvé")
        }
    
        const session = await this.findById(sessionId);
    
        if (!session) {
            throw new Error(`Session with ID ${sessionId} not found`);
        }
    
        return this.dbService.session.update({
            where: {
                sessionId, 
            },
            data: {
                title: sessionData.title,
                description: sessionData.description,
                sessionDate: sessionData.sessionDate,
                placesRemaining: sessionData.placesRemaining,
                placesAvailable: sessionData.placesAvailable,
                sport: sessionData.sportId 
                    ? { connect: { sportId: sessionData.sportId } } 
                    : undefined,
            },
            include: this.include,
        });
    }


    public async deleteSession(sessionId: SessionEntity["sessionId"]) {
        const session = await this.findById(sessionId)

        if(!session){
            throw new NotFoundException("La session n'a pas été trouvé")
        }

        return this.dbService.session.delete({
            where: {
                sessionId: sessionId
            }
        })
    }


    public async addUserToSession(sessionId: SessionEntity["sessionId"], userId: number) {

        const session = await this.findById(sessionId)

        if(!session){
            throw new NotFoundException("La session n'a pas été trouvé")
        }

        if (session.isFull) {
            throw new BadRequestException("Session is full")
        }

        const userAlreadyInSession = session.users.some(user => user.userId === userId);
        if (userAlreadyInSession) {
            throw new BadRequestException("User already in session");
        }  

        
        const isFull = session.placesRemaining - 1 === 0;

        return this.dbService.session.update({
            where: {
                sessionId
            },
            data: {
                users: {
                    connect: {
                        userId
                    }
                },
                placesRemaining: {
                    decrement: 1
                },
                isFull: isFull
            },
            include: this.include
        })
    }


    public async leaveSession(sessionId: SessionEntity["sessionId"], userId: number) {
        const session = await this.findById(sessionId)

        if(!session){
            throw new NotFoundException("La session n'a pas été trouvé")
        }

        const userInSession = session.users.find(user => user.userId === userId);
        if (!userInSession) {
            throw new BadRequestException("User not in session");
        }  

        const isFull = session.placesRemaining + 1 > 0;

        return this.dbService.session.update({
            where: {
                sessionId
            },
            data: {
                users: {
                    disconnect: {
                        userId
                    }
                },
                placesRemaining: {
                    increment: 1
                },
                isFull : !isFull
            },
            include: this.include
        })
    }
}