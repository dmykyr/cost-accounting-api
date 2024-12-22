import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddAccountDto {
  @IsNotEmpty({ message: 'UserId can not be empty' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'UserId should be number' })
  userId: number;

  @IsNotEmpty({ message: 'Initial Balance can not be empty' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Initial Balance should be number' })
  @Min(0, { message: 'Initial Balance should be positive' })
  initialBalance: number;
}
