import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from '../database/models/user';
import { AddUserDto } from '../dtos/addUserDto';
import { UsersService } from './users.service';
import { AddRecordDTO } from '../dtos/AddRecordDTO';
import { Record } from '../database/models/record';
import { RecordsService } from '../records/records.service';

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
  async getUser(@Param('userId') userId: number): Promise<User> {
    return this.usersService.getUser(userId);
  }

  @Post()
  async addUser(@Body() addUserDto: AddUserDto): Promise<User> {
    return this.usersService.addUser(addUserDto);
  }

  @Post('/:userId/records')
  async addRecord(
      @Param('userId') userId: number,
      @Body() dto: AddRecordDTO
  ): Promise<Record> {
    return this.recordsService.addRecord(userId, dto);
  }

  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: number) {
    return this.usersService.deleteUser(userId);
  }
}
