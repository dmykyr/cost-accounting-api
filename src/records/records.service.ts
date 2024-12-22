import { Record } from '../database/models/record';
import { AddRecordDTO } from '../dtos/AddRecordDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from '../accounts/account.service';
import { BadRequestException } from '@nestjs/common';

export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    private readonly accountService: AccountService,
  ) {}
  async getAllRecords(userId?: number, categoryId?: number): Promise<Record[]> {
    return this.recordRepository.find({
      where: {
        userId: isNaN(userId) ? undefined : userId,
        categoryId: isNaN(categoryId) ? undefined : categoryId,
      },
    });
  }

  async getRecord(recordId: number): Promise<Record> {
    return this.recordRepository.findOne({ where: { id: recordId } });
  }

  async addRecord(userId: number, dto: AddRecordDTO): Promise<Record> {
    const userAccount = await this.accountService.getUserAccount(userId);
    const newBalanceValue = userAccount.balance - dto.spendingCosts;
    if (newBalanceValue < 0) {
      throw new BadRequestException('Account balance can not be negative');
    }
    await this.accountService.setAccountBalance(newBalanceValue, userAccount.id);

    return this.recordRepository.save({
      userId,
      ...dto,
      createdAt: new Date(Date.now()),
    });
  }

  async deleteRecord(id: number) {
    await this.recordRepository.delete(id);
  }
}
