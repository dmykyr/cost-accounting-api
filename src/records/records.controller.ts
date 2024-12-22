import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { Record } from '../database/models/record';
import { RecordsService } from './records.service';
import { RecordByIdPipe } from './recordByIdPipe';

@Controller('record')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
  async getAllRecords(
      @Query('userId') userId: number,
      @Query('categoryId') categoryId: number,
  ): Promise<Record[]> {
    if (!userId && !categoryId) {
      throw new BadRequestException('At least one parameter is required');
    }
    return this.recordsService.getAllRecords(userId, categoryId);
  }

  @Get('/:recordId')
  async getRecord(@Param('recordId', RecordByIdPipe) record: Record): Promise<Record> {
    return record;
  }

  @Delete('/:recordId')
  async deleteRecord(@Param('recordId', RecordByIdPipe) record: Record) {
    await this.recordsService.deleteRecord(record.id);
  }
}
