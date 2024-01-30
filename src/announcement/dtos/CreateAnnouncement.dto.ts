import { IsNotEmpty } from "class-validator";

export class CreateAnnouncementDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}