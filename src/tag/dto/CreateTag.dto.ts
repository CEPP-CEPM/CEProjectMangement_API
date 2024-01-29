import { IsNotEmpty } from "class-validator";

export class CreateTagDto {
    id: number;

    @IsNotEmpty()
    name: string;
}