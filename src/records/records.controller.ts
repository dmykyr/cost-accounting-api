import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Record } from '../database/models/record';
import { AddRecordDTO } from '../dtos/AddRecordDTO';
import { RecordsService } from './records.service';

@Controller('record')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}
  @Get()
  getAllRecords(@Query('userId') userId: number, @Query('categoryId') categoryId: number): Record[] {
    if (!userId && !categoryId) throw new BadRequestException('any parameters were provided');

    return this.recordsService.getAllRecords(userId, categoryId);
  }

  @Get('/:recordId')
  getRecord(@Param('recordId') recordId: number): Record {
    return this.recordsService.getRecord(recordId);
  }

  @Post()
  addRecord(@Body() dto: AddRecordDTO): Record {
    return this.recordsService.addRecord(dto);
  }

  @Delete('/:recordId')
  deleteRecord(@Param('recordId') recordId: number) {
    this.recordsService.deleteRecord(recordId);
  }
}
