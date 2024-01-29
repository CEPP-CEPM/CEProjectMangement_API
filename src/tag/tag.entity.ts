import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Tags')
export class TagEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}