import { AssignmentStatus } from 'src/enums/assignmentStatus.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateProtorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(AssignmentStatus)
  status: AssignmentStatus;
}