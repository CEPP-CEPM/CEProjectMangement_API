import { IsNotEmpty } from "class-validator";

export class CreateAnnouncementDto {
    announcement_id: number;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    createAt: Date;

    modifyAt: Date;
}