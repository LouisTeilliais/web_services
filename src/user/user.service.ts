import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {User} from "./user.entity";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userData: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: userData,
    });
  }
  async findOne(username: string): Promise<User> {
    return this.prisma.user.findFirst({ where: { name: username },});
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
