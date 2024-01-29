import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { CreateTagDto } from './dto/CreateTag.dto';
import { Repository } from 'typeorm';


@Injectable()
export class TagService {

    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>
    ) {}

    async findAll() {

    }

    async create(createTagDto: CreateTagDto) {
        return await this.tagRepository.save(createTagDto)
    }
}
