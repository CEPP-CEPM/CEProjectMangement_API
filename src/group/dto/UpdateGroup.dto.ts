import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  topic: string;

  @ApiProperty()
  @IsNotEmpty()
  tag: string;

  @ApiProperty()
  deleteUsers: string[];

  @ApiProperty()
  addUsers: string[];
}
