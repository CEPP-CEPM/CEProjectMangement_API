import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementEntity } from './announcement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnnouncementEntity])],
  providers: [AnnouncementService],
  controllers: [AnnouncementController],
})
export class PostModule {}
