import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

@Module({
    imports: [PrismaModule, MinioClientModule],
    providers: [AnnouncementService],
    controllers: [AnnouncementController],
})
export class AnnouncementModule {}
