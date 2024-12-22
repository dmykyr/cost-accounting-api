import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/models/user';
import { RecordsService } from '../records/records.service';
import { Record } from '../database/models/record';
import { AccountService } from '../accounts/account.service';
import { Account } from '../database/models/account';

@Module({
  imports: [TypeOrmModule.forFeature([User, Record, Account])],
  controllers: [UsersController],
  providers: [UsersService, RecordsService, AccountService],
})
export class UsersModule {}
