import { Injectable, PipeTransform, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../database/models/user';

@Injectable()
export class UserByIdPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  async transform(value: any): Promise<User> {
    const userId = parseInt(value, 10);

    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('User Id must be a positive number');
    }

    const user = await this.usersService.getUser(userId);
    if (!user) {
      throw new NotFoundException(`User with Id ${userId} not found`);
    }

    return user;
  }
}
