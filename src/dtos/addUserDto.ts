import { IsNotEmpty } from 'class-validator';

export class AddUserDto {
  @IsNotEmpty({ message: 'Name can not be empty' })
  name: string;
}
