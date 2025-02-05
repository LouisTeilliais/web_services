import { Injectable } from "@nestjs/common";
import SessionRepositoryService from "../repositories/session.repository";


@Injectable()
export default class SessionControllerService {

    constructor(private readonly sessionRepositoryService: SessionRepositoryService ) {}


    async getAllSession(){
        const sessions = await this.sessionRepositoryService.findMany()

        return sessions
    }
}