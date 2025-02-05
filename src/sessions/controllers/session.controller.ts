import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import SessionControllerService from "../services/controllers/session.controller.service";
import { SessionDto } from "../models/session.dto";


@ApiTags("Sessions")
@Controller("sessions")
export default class SessionController {
 
    constructor(private readonly sessionControllerService: SessionControllerService) {}


    @Get()
    async getAllSessions(){
        return this.sessionControllerService.getAllSession()
    }

    @Get(":sessionId")
    async getSessionById(sessionId: number){
        return this.sessionControllerService.getSessionById(sessionId)
    }

    @Post()
    async createSession(
        @Body() sessionDto: SessionDto
    ){
        return this.sessionControllerService.createSession(sessionDto)
    }

}