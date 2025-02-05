import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userData: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: userData,
    });
  }
  async findOne(name: string): Promise<User> {
    return this.prisma.user.findFirst({ where: { name: name } });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<User | null> {
    if (!email) {
      throw new Error("L'email fourni est invalide ou manquant.");
    }

    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
