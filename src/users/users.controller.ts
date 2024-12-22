import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from '../database/models/user';
import { AddUserDto } from '../dtos/addUserDto';
import { UsersService } from './users.service';
import { AddRecordDTO } from '../dtos/AddRecordDTO';
import { Record } from '../database/models/record';
import { RecordsService } from '../records/records.service';
import { UserByIdPipe } from './userByIdPipe';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly recordsService: RecordsService,
  ) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get('/:userId')
  async getUser(@Param('userId', UserByIdPipe) user: User): Promise<User> {
    return user;
  }

  @Post()
  async addUser(@Body() addUserDto: AddUserDto): Promise<User> {
    return this.usersService.addUser(addUserDto);
  }

  @Post('/:userId/records')
  async addRecord(@Param('userId', UserByIdPipe) user: User, @Body() dto: AddRecordDTO): Promise<Record> {
    return this.recordsService.addRecord(user.id, dto);
  }

  @Delete('/:userId')
  async deleteUser(@Param('userId', UserByIdPipe) user: User) {
    return this.usersService.deleteUser(user.id);
  }
}
