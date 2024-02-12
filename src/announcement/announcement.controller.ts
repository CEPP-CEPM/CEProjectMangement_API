import { Body, Controller, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/CreateAnnouncement.dto';
import { UpdateAnnouncementDto } from './dto/UpdateAnnouncement.dto';
import { ApiTags } from '@nestjs/swagger';
import { BufferedFile } from 'src/minio-client/file.model';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('announcement')
@Controller('announcement')
export class AnnouncementController {

    constructor(private readonly announcementService: AnnouncementService){}

    @Get()
    async findAllAnnouncement() {
        return await this.announcementService.findAllAnnouncement()
    }

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async createAnnouncement(@UploadedFiles() files: BufferedFile[], @Body() createAnnouncementDto: CreateAnnouncementDto) {
        return await this.announcementService.createAnnouncement(createAnnouncementDto, files)
    }

    @Put(':id')
    async updateAnnouncement(@Param('id') id: string, @Body() updateAnnouncement: UpdateAnnouncementDto) {
        // return await this.announcementService.updateAnnouncement(id, updateAnnouncement)
    }
}
