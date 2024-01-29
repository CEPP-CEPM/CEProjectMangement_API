import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('announcements')
export class AnnouncementEntity {
    @PrimaryGeneratedColumn()
    announcement_id: number

    @Column({default: ''})
    title: string

    @Column({default: ''})
    description: string

    @Column({default: () => "CURRENT_TIMESTAMP" })
    createAt: Date

    @UpdateDateColumn({default: () => "CURRENT_TIMESTAMP" })
    modifyAt: Date;
}