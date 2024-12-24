import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AddUserDto } from '../dtos/addUserDto';
import { LoginDTO } from '../dtos/LoginDTO';
import { JwtAuthGuard } from '../guards/jwtAuthGuard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req: any) {
    return this.userService.getUser({ id: req.user.userId });
  }
}
