import { IsNotEmpty, MinLength } from 'class-validator';
export class RegisterDto {
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password should has at least 6 characters' })
  password: string;
}
