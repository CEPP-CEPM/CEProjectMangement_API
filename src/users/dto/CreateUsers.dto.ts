import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersDto {
  @ApiProperty()
  subjectName: string
}
