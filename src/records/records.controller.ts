import { BadRequestException, Controller, Delete, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Record } from '../database/models/record';
import { RecordsService } from './records.service';
import { RecordByIdPipe } from './recordByIdPipe';
import { JwtAuthGuard } from '../guards/jwtAuthGuard';

@Controller('record')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllRecords(
      @Query('userId') userId: number,
      @Query('categoryId') categoryId: number,
  ): Promise<Record[]> {
    if (!userId && !categoryId) {
      throw new BadRequestException('At least one parameter is required');
    }
    return this.recordsService.getAllRecords(userId, categoryId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:recordId')
  async getRecord(@Param('recordId', RecordByIdPipe) record: Record): Promise<Record> {
    return record;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:recordId')
  async deleteRecord(@Param('recordId', RecordByIdPipe) record: Record) {
    await this.recordsService.deleteRecord(record.id);
  }
}
