import { Body, Controller, Delete, Get, Request, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/CreateAnnouncement.dto';
import { UpdateAnnouncementDto } from './dto/UpdateAnnouncement.dto';
import { ApiTags } from '@nestjs/swagger';
import { BufferedFile } from 'src/minio-client/file.model';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('announcement')
@Controller('announcement')
export class AnnouncementController {

    constructor(private readonly announcementService: AnnouncementService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAllAnnouncement() {
        return await this.announcementService.findAllAnnouncement()
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOneAnnouncement(@Param('id') id: string) {
        return await this.announcementService.findOneAnnouncement(id)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    async createAnnouncement(@UploadedFiles() files: BufferedFile[], @Body() createAnnouncementDto: CreateAnnouncementDto, @Request() req) {
        return await this.announcementService.createAnnouncement(createAnnouncementDto, files)
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    async updateAnnouncement(@Param('id') id: string, @UploadedFiles() files: BufferedFile[], @Body() updateAnnouncement: UpdateAnnouncementDto) {
        return await this.announcementService.updateAnnouncement(id, updateAnnouncement, files)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteById(@Param('id') id: string) {
        return await this.announcementService.deleteById(id)
    }
}
