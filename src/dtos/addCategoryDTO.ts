import { IsNotEmpty } from 'class-validator';

export class AddCategoryDTO {
  @IsNotEmpty({ message: 'Name can not be empty' })
  name: string;
}
