import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('announcements')

export class AnnouncementEntity {
    @PrimaryGeneratedColumn()
    announcement_id: number

    @Column({default: ''})
    title: string

    @Column({default: ''})
    description: string

    @Column()
    createAt: Date
}