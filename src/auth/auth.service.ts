import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AddUserDto } from '../dtos/addUserDto';
import { User } from '../database/models/user';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from '../dtos/LoginDTO';
import { JwtPayload } from './jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: AddUserDto) {
    const createdUser = await this.usersService.addUser(dto);
    return {
      access_token: this.jwtService.sign(createdUser),
    };
  }

  async login(user: User) {
    const payload: JwtPayload = { username: user.name, sub: user.id };
    console.log('payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(dto: LoginDTO): Promise<any> {
    console.log(dto);
    const user = await this.usersService.getUser({ name: dto.name });
    if (!user) {
      throw new BadRequestException('User was not found');
    }
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('The password is incorrect');
    }

    return user;
  }
}
