import { IsDateString, IsNotEmpty } from "class-validator";

export class AnnouncementDto {
    announcement_id: number;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsDateString()
    createAt: Date;
}