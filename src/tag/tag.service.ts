import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { TagEntity } from './tag.entity';
import { CreateTagDto } from './dto/CreateTag.dto';
// import { Repository } from 'typeorm';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagService {

    constructor(
        // @InjectRepository(TagEntity)
        // private readonly tagRepository: Repository<TagEntity>
        private readonly prismaService: PrismaService
    ) {}

    async findAll() {

    }

    async create(createTagDto: Prisma.TagsCreateInput) {
        // return await this.tagRepository.save(createTagDto)
        const tag = await this.prismaService.tags.create({
            data: createTagDto,
        })
        return tag
    }
}
