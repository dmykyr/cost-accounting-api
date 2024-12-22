import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { AddAccountDto } from '../dtos/addAccountDto';
import { Account } from '../database/models/account';
import { IncreaseAccountBalanceDto } from '../dtos/increaseAccountBalanceDto';
import { AccountByIdPipe } from './accountByIdPipe';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/:accountId/balance')
  async addBalance(
      @Param('accountId', AccountByIdPipe) account: Account,
      @Body() increaseAccountBalanceDto: IncreaseAccountBalanceDto,
  ): Promise<void> {
    return this.accountService.addBalance(increaseAccountBalanceDto, account.id);
  }

  @Post()
  async addAccount(@Body() addAccountDto: AddAccountDto): Promise<Account> {
    return this.accountService.addAccount(addAccountDto);
  }

  @Delete('/:accountId')
  async deleteAccount(@Param('accountId', AccountByIdPipe) account: Account) {
    return this.accountService.deleteAccount(account.id);
  }
}
