import { Controller, Get } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementDto } from './dtos/Announcement.dto';

@Controller('announcement')
export class AnnouncementController {

    constructor(private readonly announcementService: AnnouncementService){}

    @Get()
    async getAllPost():Promise<AnnouncementDto[]> {
        return await this.announcementService.findAllAnnouncement()
    }
}
