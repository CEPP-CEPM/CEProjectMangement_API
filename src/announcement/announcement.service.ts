import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnnouncementService {

    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async findAllAnnouncement() {
        return await this.prismaService.announcements.findMany()
    }

    async createAnnouncement(createAnnouncementDto: Prisma.AnnouncementsCreateInput) {
        return await this.prismaService.announcements.create({data: createAnnouncementDto})
    }

    async updateAnnouncement(id: string,updateAnnouncementDto: Prisma.AnnouncementsCreateInput) {
        return await this.prismaService.announcements.update({data: updateAnnouncementDto, where: {id: id}})
    }
}
