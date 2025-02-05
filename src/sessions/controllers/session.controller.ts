import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
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
    async getSessionById(
        @Param("sessionId", ParseIntPipe) sessionId: number, 
    ){
        return this.sessionControllerService.getSessionById(sessionId)
    }

    @Post()
    async createSession(
        @Body() sessionDto: SessionDto
    ){
        return this.sessionControllerService.createSession(sessionDto)
    }

    @Put(":sessionId")
    async updateSession(
        @Body() sessionDto: SessionDto,
        @Param("sessionId", ParseIntPipe) sessionId: number, 
    ){
        return this.sessionControllerService.updateSession(sessionId, sessionDto)
    }


    @Delete(":sessionId")
    async deleteSession(
        @Param("sessionId", ParseIntPipe) sessionId: number, 
    ){
        return this.sessionControllerService.deleteSession(sessionId)
    }

    @Post(":sessionId/joinSession")
    async addUserToSession(
        @Param("sessionId", ParseIntPipe) sessionId: number, 
        @Body("userId", ParseIntPipe) userId: number 
    ) {
        return this.sessionControllerService.addUserToSession(sessionId, userId);
    }

    @Post(":sessionId/leaveSession")
    async leaveSession(
        @Param("sessionId", ParseIntPipe) sessionId: number, 
        @Body("userId", ParseIntPipe) userId: number 
    ) {
        return this.sessionControllerService.leaveSession(sessionId, userId);
    }
}