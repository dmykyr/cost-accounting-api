import { Record } from '../database/models/record';
import { AddRecordDTO } from '../dtos/AddRecordDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}
  async getAllRecords(userId?: number, categoryId?: number): Promise<Record[]> {
    return this.recordRepository.find({
      where: {
        userId,
        categoryId,
      },
    });
  }

  async getRecord(recordId: number): Promise<Record> {
    return this.recordRepository.findOne({ where: { id: recordId } });
  }

  async addRecord(dto: AddRecordDTO): Promise<Record> {
    return this.recordRepository.save({
      ...dto,
      createdAt: new Date(Date.now()),
    });
  }

  async deleteRecord(id: number) {
    await this.recordRepository.delete(id);
  }
}
