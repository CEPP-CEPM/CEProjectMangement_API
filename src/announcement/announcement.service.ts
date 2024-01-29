import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnouncementEntity } from './announcement.entity';
import { Repository } from 'typeorm';
import { CreateAnnouncementDto } from './dtos/CreateAnnouncement.dto';
import { UpdateAnnouncementDto } from './dtos/UpdateAnnouncement.dto';

@Injectable()
export class AnnouncementService {

    constructor(
        @InjectRepository(AnnouncementEntity)
        private readonly postRepository: Repository<AnnouncementEntity>,
    ) {}

    async findAllAnnouncement(): Promise<CreateAnnouncementDto[]> {
        return await this.postRepository.find()
    }

    async createAnnouncement(createAnnouncementDto: CreateAnnouncementDto) {
        return await this.postRepository.save(createAnnouncementDto)
    }

    async updateAnnouncement(id: number,updateAnnouncementDto: UpdateAnnouncementDto) {
        return await this.postRepository.update(id, updateAnnouncementDto)
    }
}
