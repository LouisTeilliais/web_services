import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import SessionControllerService from "../services/controllers/session.controller.service";


@ApiTags("Sessions")
@Controller("sessions")
export default class SessionController {
 
    constructor(private readonly sessionControllerService: SessionControllerService) {}


    @Get()
    async getAllSessions(){
        return this.sessionControllerService.getAllSession()
    }
}