import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body()
    user: {
      name: string;
      email: string;
      password: string;
      role: string;
    },
  ) {
    return this.authService.signup(
      user.name,
      user.email,
      user.password,
      user.role,
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
