import {
  Injectable,
  PipeTransform,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from '../database/models/account';

@Injectable()
export class AccountByIdPipe implements PipeTransform {
  constructor(private readonly accountService: AccountService) {}

  async transform(value: any): Promise<Account> {
    const accountId = parseInt(value, 10);

    if (isNaN(accountId) || accountId <= 0) {
      throw new BadRequestException('Account Id must be a positive number');
    }

    const account = await this.accountService.getAccount(accountId);
    if (!account) {
      throw new NotFoundException(`Account with Id ${accountId} not found`);
    }

    return account;
  }
}
