import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from '../database/models/record';
import { AccountService } from '../accounts/account.service';
import { Account } from '../database/models/account';

@Module({
  imports: [TypeOrmModule.forFeature([Record, Account])],
  controllers: [RecordsController],
  providers: [RecordsService, AccountService],
})
export class RecordsModule {}
