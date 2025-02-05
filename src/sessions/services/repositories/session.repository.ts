import { Injectable } from "@nestjs/common";
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

    public async findMany() {
        return this.dbService.session.findMany({
            include: this.include
        })
    }

    public async findOne(sessionId: SessionEntity["sessionId"]) : Promise<SessionEntity> {
        return this.dbService.session.findFirst(
            {
                where: {
                    sessionId
                },
                include: this.include
            }
        )
    }

    public async createSession(sessionData : 
        Pick<SessionEntity, "title" | "description" | "sessionDate" | "placesRemaining" | "placesAvailable"  | "sportId">) : Promise<SessionEntity> {  {
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
    }

}}