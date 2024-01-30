import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagService {

    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async findAll() {
        return await this.prismaService.tags.findMany()
    }

    async create(createTagDto: Prisma.TagsCreateInput) {
        const tag = await this.prismaService.tags.create({
            data: createTagDto,
        })
        return tag
    }
}
