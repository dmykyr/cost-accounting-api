import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from '../models/user';
import { AddUserDto } from '../dtos/addUserDto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): User[] {
    return this.usersService.getAllUsers();
  }

  @Get('/:userId')
  getUser(@Param('userId') userId: number): User {
    return this.usersService.getUser(userId);
  }

  @Post()
  addUser(@Body() addUserDto: AddUserDto): User {
    return this.usersService.addUser(addUserDto);
  }

  @Delete('/:userId')
  deleteUser(@Param('userId') userId: number) {
    return this.usersService.deleteUser(userId);
  }
}
