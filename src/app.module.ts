import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { RecordsModule } from './records/records.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [UsersModule, CategoriesModule, RecordsModule, HealthcheckModule],
})
export class AppModule {}
