import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MinioClientService } from '../minio-client/minio-client.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GroupService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly minioClientService: MinioClientService
    ) {}

    async findAll() {
        return await this.prismaService.groups.findMany()
    }

    async findByGroupId(id: string) {
        return await this.prismaService.groups.findUnique({
            where: {
                id: id
            }
        })
    }

    async create(createGroupDto: Prisma.GroupsCreateInput) {
        const group = await this.prismaService.groups.create({
            data: {
                topic: createGroupDto.topic,
                tag: createGroupDto.tag
            }
        })
        return group
    }
}
