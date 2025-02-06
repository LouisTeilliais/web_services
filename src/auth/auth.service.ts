import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(name: string, email: string, password: string, role: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new Error('Cet email est déjà utilisé.');
    }

    if (!['coach', 'user'].includes(role)) {
      throw new Error('"Le rôle doit être "coach" ou "user"');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return { message: 'Utilisateur créé avec succès.', user };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; message: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Mot de passe incorrect.');
    }

    const payload = { userId: user.userId, role: user.role };

    return {
      message: 'Token généré avec succès : ',
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
