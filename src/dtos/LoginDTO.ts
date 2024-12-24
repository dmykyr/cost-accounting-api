import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'Name can not be empty' })
  name: string;

  @IsNotEmpty({ message: 'Password can not be empty' })
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'Password must contain at least one uppercase letter and one number',
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;
}
