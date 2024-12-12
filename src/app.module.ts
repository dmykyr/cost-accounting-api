import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [UsersModule, CategoriesModule, RecordsModule],
})
export class AppModule {}
