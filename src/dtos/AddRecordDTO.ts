import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddRecordDTO {
  @IsNotEmpty({ message: 'CategoryId can not be empty' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'CategoryId should be number' })
  categoryId: number;

  @IsNotEmpty({ message: 'SpendingCosts can not be empty' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'SpendingCosts should be number' })
  @Min(0, { message: 'SpendingCosts should be positive' })
  spendingCosts: number;
}
