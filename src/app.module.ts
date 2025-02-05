import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { SessionModule } from './sessions/session.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SessionModule,
    UserModule,
    AuthModule,
    PrismaModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
