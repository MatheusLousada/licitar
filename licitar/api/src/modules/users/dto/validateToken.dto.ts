import { IsNotEmpty, IsString, IsEmail, MinLength, ValidateIf } from 'class-validator';

export class ValidateTokenDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}
