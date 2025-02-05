import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma'
import { SessionModule } from './sessions/session.module';

@Module({
  imports: [
    SessionModule, 
    PrismaModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
