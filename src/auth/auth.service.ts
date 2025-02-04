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

  async signup(
    username: string,
    email: string,
    password: string,
    role: string,
  ) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new Error('Cet email est déjà utilisé.');
    }

    if (!['formateur', 'etudiant'].includes(role)) {
      throw new Error('"Le rôle doit être "formateur" ou "etudiant"');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.create(
      username,
      email,
      hashedPassword,
      role,
    );

    return { message: 'Utilisateur créé avec succès.', user };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    const payload = { userId: user.userId, role: user.role };
    const token = this.jwtService.sign(payload);

    return { message: 'Connexion réussie.', token };
  }
}
