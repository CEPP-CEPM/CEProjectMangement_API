import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dtos/CreateAnnouncement.dto';
import { UpdateAnnouncementDto } from './dtos/UpdateAnnouncement.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('announcement')
@Controller('announcement')
export class AnnouncementController {

    constructor(private readonly announcementService: AnnouncementService){}

    @Get()
    async getAllPost() {
        return await this.announcementService.findAllAnnouncement()
    }

    @Post()
    async createAnnouncement(@Body() createAnnouncementDto: CreateAnnouncementDto) {
        return await this.announcementService.createAnnouncement(createAnnouncementDto)
    }

    @Put(':id')
    async updateAnnouncement(@Param('id') id: number, @Body() updateAnnouncement: UpdateAnnouncementDto) {
        return await this.announcementService.updateAnnouncement(id, updateAnnouncement)
    }
}
