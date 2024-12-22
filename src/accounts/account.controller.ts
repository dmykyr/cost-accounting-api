import { Body, Delete, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { AddAccountDto } from '../dtos/addAccountDto';
import { Account } from '../database/models/account';
import { IncreaseAccountBalanceDto } from '../dtos/increaseAccountBalanceDto';

export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/:accountId/balance')
  async addBalance(
      @Param('accountId') accountId: number,
      @Body() increaseAccountBalanceDto: IncreaseAccountBalanceDto
  ): Promise<void> {
    return this.accountService.addBalance(increaseAccountBalanceDto, accountId);
  }

  @Post()
  async addAccount(@Body() addAccountDto: AddAccountDto): Promise<Account> {
    return this.accountService.addAccount(addAccountDto);
  }

  @Delete('/:accountId')
  async deleteAccount(@Param('accountId') accountId: number) {
    return this.accountService.deleteAccount(accountId);
  }
}
