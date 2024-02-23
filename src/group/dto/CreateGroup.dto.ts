import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateGroupDto {
    @ApiProperty()
    @IsNotEmpty()
    userId: string

    @ApiProperty()
    @IsNotEmpty()
    topic: string

    @ApiProperty()
    @IsNotEmpty()
    tag: string

    @ApiProperty()
    @IsNotEmpty()
    userGroup: string[]
}