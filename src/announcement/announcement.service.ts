import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnouncementEntity } from './announcement.entity';
import { Repository } from 'typeorm';
import { AnnouncementDto } from './dtos/Announcement.dto';

@Injectable()
export class AnnouncementService {

    constructor(
        @InjectRepository(AnnouncementEntity)
        private readonly postRepository: Repository<AnnouncementEntity>,
    ) {}

    async findAllAnnouncement(): Promise<AnnouncementDto[]> {
        return await this.postRepository.find()
    }
}
