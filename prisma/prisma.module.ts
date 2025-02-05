import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // Importer PrismaService

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
