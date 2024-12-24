import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '../database/models/user';
import { UsersService } from './users.service';
import { AddRecordDTO } from '../dtos/AddRecordDTO';
import { Record } from '../database/models/record';
import { RecordsService } from '../records/records.service';
import { UserByIdPipe } from './userByIdPipe';
import { JwtAuthGuard } from '../guards/jwtAuthGuard';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly recordsService: RecordsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  async getUser(@Param('userId', UserByIdPipe) user: User): Promise<User> {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:userId/records')
  async addRecord(@Param('userId', UserByIdPipe) user: User, @Body() dto: AddRecordDTO): Promise<Record> {
    return this.recordsService.addRecord(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:userId')
  async deleteUser(@Param('userId', UserByIdPipe) user: User) {
    return this.usersService.deleteUser(user.id);
  }
}
