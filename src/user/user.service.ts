import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userData: Prisma.UserCreateInput) {
    if (!userData) {
      throw new Error('Informations du user fourni sont invalide ou manquant.');
    }
    return this.prisma.user.create({
      data: userData,
    });
  }
  async findOne(id: number): Promise<User> {
    if (!id) {
      throw new Error("L'id fourni est invalide ou manquant.");
    }
    return this.prisma.user.findFirst({ where: { userId: id } });
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
  async update(userId: number, userData: User) {
    const user = await this.prisma.user.findUnique({ where: { userId } });

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return this.prisma.user.update({
      where: { userId },
      data: userData,
    });
  }

  async delete(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { userId } });

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return this.prisma.user.delete({ where: { userId } });
  }
}
