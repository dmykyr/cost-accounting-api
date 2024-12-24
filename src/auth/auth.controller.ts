import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AddUserDto } from '../dtos/addUserDto';
import { LoginDTO } from '../dtos/LoginDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: AddUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDTO) {
    const user = await this.authService.validateUser(dto);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
