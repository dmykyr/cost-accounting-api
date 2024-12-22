import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class IncreaseAccountBalanceDto {
  @IsNotEmpty({ message: 'Increasing sum can not be empty' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Increasing sum should be number' })
  @Min(0, { message: 'Increasing sum should be positive' })
  increaseSum: number;
}
