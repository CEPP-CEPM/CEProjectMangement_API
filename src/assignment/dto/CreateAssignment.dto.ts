import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateAssignmentDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    subjectName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    dueAt: Date
}