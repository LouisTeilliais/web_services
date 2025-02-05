import { Injectable } from "@nestjs/common";
import { PrismaService } from 'nestjs-prisma'
import SessionEntity from "src/utils/entities/session.entity";

@Injectable()
export default class SessionRepositoryService {
        
    constructor(private readonly dbService: PrismaService) {}

    public async findMany() {
        return this.dbService.session.findMany()
    }

    public async findOne(sessionId: SessionEntity["sessionId"]) : Promise<SessionEntity> {
        return this.dbService.session.findFirst(
            {
                where: {
                    sessionId
                }
            }
        )
    }

    // public async createSession(data = Pick<SessionEntity>)

}