import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAssignmentSubmitDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  assignmentId: string;
}