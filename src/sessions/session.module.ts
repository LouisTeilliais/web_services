import { Module } from "@nestjs/common";
import SessionController from "./controllers/session.controller";
import SessionControllerService from "./services/controllers/session.controller.service";
import SessionRepositoryService from "./services/repositories/session.repository";

@Module({
    imports: [],
    controllers: [SessionController],
    providers: [SessionControllerService, SessionRepositoryService],
})
export class SessionModule {}
