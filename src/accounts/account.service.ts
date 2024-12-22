import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../database/models/account';
import { AddAccountDto } from '../dtos/addAccountDto';
import { IncreaseAccountBalanceDto } from '../dtos/increaseAccountBalanceDto';

export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}
  async getUserAccount(userId: number): Promise<Account> {
    return this.accountRepository.findOne({ where: { userId } });
  }

  async addAccount(dto: AddAccountDto): Promise<Account> {
    return this.accountRepository.save({ balance: dto.initialBalance, userId: dto.userId });
  }

  async addBalance(dto: IncreaseAccountBalanceDto, accountId: number) {
    const account = await this.accountRepository.findOne({ where: { id: accountId } });
    const newBalance = account.balance + dto.increaseSum;
    await this.accountRepository.update(accountId, { balance: newBalance });
  }

  async setAccountBalance(accountId: number, newBalanceValue: number) {
    await this.accountRepository.update(accountId, { balance: newBalanceValue });
  }

  async deleteAccount(id: number) {
    await this.accountRepository.delete(id);
  }

  async getAccount(id: number) {
    return this.accountRepository.findOneBy({ id });
  }
}
