import { Module } from '@nestjs/common';
import SessionController from './controllers/session.controller';
import SessionControllerService from './services/controllers/session.controller.service';
import SessionRepositoryService from './services/repositories/session.repository';
import { JwtModule } from '@nestjs/jwt';
import MailService from "src/mailer/mail.service";

@Module({
  imports: [JwtModule],
  controllers: [SessionController],
  providers: [SessionControllerService, SessionRepositoryService, MailService],
})
export class SessionModule {}
