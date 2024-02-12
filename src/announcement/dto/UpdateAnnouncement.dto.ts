import { IsNotEmpty } from "class-validator";

export class UpdateAnnouncementDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}