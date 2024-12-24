import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { AddAccountDto } from '../dtos/addAccountDto';
import { Account } from '../database/models/account';
import { IncreaseAccountBalanceDto } from '../dtos/increaseAccountBalanceDto';
import { AccountByIdPipe } from './accountByIdPipe';
import { JwtAuthGuard } from '../guards/jwtAuthGuard';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:accountId/balance')
  async addBalance(
      @Param('accountId', AccountByIdPipe) account: Account,
      @Body() increaseAccountBalanceDto: IncreaseAccountBalanceDto,
  ): Promise<void> {
    return this.accountService.addBalance(increaseAccountBalanceDto, account.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addAccount(@Body() addAccountDto: AddAccountDto): Promise<Account> {
    return this.accountService.addAccount(addAccountDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:accountId')
  async deleteAccount(@Param('accountId', AccountByIdPipe) account: Account) {
    return this.accountService.deleteAccount(account.id);
  }
}
