import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { SessionModule } from './sessions/session.module';
import { MailerModule } from "@nestjs-modules/mailer";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SessionModule,
    UserModule,
    AuthModule,
    PrismaModule.forRoot({ isGlobal: true }),
    MailerModule.forRoot(
      {
        transport: {
          host: "smtp.gmail.com",
          port: 587,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
          }
        },
      }
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
