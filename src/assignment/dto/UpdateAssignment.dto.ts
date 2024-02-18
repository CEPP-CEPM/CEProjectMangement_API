import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty } from "class-validator";

export class UpdateAssignmentDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    dueAt: Date
}