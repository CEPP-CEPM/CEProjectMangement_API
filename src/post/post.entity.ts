import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('announcements')

export class PostEntity {
    @PrimaryGeneratedColumn()
    announcement_id: number

    @Column({default: ''})
    title: string

    @Column({default: ''})
    description: string
}