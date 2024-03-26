import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AnnouncementFiles {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  bucket: string;
}

export class GetAnnouncementDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createAt: string;

  @ApiProperty()
  modifyAt: string;

  // @Type(() => GetUserDto)
  // Advisor: GetUserDto;

  @ApiProperty()
  @Type(() => AnnouncementFiles)
  AnnouncementFiles: AnnouncementFiles[];
}
