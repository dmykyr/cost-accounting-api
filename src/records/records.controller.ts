import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Record } from '../database/models/record';
import { AddRecordDTO } from '../dtos/AddRecordDTO';
import { RecordsService } from './records.service';

@Controller('record')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}
  @Get()
  async getAllRecords(@Query('userId') userId: number, @Query('categoryId') categoryId: number): Promise<Record[]> {
    if (!userId && !categoryId) throw new BadRequestException('any parameters were provided');

    return this.recordsService.getAllRecords(userId, categoryId);
  }

  @Get('/:recordId')
  async getRecord(@Param('recordId') recordId: number): Promise<Record> {
    return this.recordsService.getRecord(recordId);
  }

  @Post()
  async addRecord(@Body() dto: AddRecordDTO): Promise<Record> {
    return this.recordsService.addRecord(dto);
  }

  @Delete('/:recordId')
  async deleteRecord(@Param('recordId') recordId: number) {
    await this.recordsService.deleteRecord(recordId);
  }
}
