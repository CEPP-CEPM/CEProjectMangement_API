import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  credential: string;

  // @IsEmail()
  // @IsNotEmpty()
  // @ApiProperty()
  // email: string;

  // @IsString()
  // @IsNotEmpty()
  // @MinLength(6)
  // @ApiProperty()
  // password: string;
}
