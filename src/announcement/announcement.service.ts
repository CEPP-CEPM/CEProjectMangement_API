import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { CreateAnnouncementDto } from './dto/CreateAnnouncement.dto';

@Injectable()
export class AnnouncementService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly minioClientService: MinioClientService
    ) {}

    async findAllAnnouncement() {
        return await this.prismaService.announcements.findMany()
    }

    async createAnnouncement(createAnnouncementDto: Prisma.AnnouncementsCreateInput, files: BufferedFile[]) {
        console.log(files)
        // return await this.prismaService.announcements.create({data: createAnnouncementDto})
        const announcement = await this.prismaService.announcements.create({
            data: {
                title: createAnnouncementDto.title,
                description: createAnnouncementDto.description,
                // Advisor: {
                    // connect: { id: user.id },
                // },
            },
            include: {
                // Advisor: true,
                AnnouncementFiles: true,
            },
        });
        const uploadFiles = await this.uploadFiles(files);
        await Promise.all(
            uploadFiles.map(async (fileuploadFile) => {
                const announcementFile = await this.prismaService.announcementFiles.create({
                    data: {
                        bucket: fileuploadFile.bucketName,
                        name: fileuploadFile.filename,
                        Announcements: {
                            connect: { id: announcement.id },
                        },
                    },
                });
                return announcementFile;
            }),
        );
        return announcement;
    }

    async updateAnnouncement(id: string, updateAnnouncementDto: Prisma.AnnouncementsUpdateInput, files: BufferedFile[]) {
        // console.log(files)
        // console.log(id);
        // console.log(updateAnnouncementDto)
        const updateAnnouncement = await this.prismaService.announcements.update({
            where: { id: id },
            data: {
                title: updateAnnouncementDto.title,
                description: updateAnnouncementDto.description,
                // Advisor: { connect: { id: user.id } },
            },
            include: {
                // Advisor: true,
                AnnouncementFiles: true,
            },
        });

        const uploadFiles = await this.uploadFiles(files);
        await Promise.all(
            uploadFiles.map(async (fileuploadFile) => {
                const announcementFile = await this.prismaService.announcementFiles.create({
                    data: {
                        bucket: fileuploadFile.bucketName,
                        name: fileuploadFile.filename,
                        Announcements: { connect: { id: id } },
                    },
                });
                return announcementFile;
            }),
        );
        return updateAnnouncement;
    }

    private async uploadFiles(files: BufferedFile[]) {
        const uploaded_files = await Promise.all(
            files.map(async (file) => {
                const uploaded_file = await this.minioClientService.upload(
                file,
                'cepm',
                );
                return uploaded_file;
            }),
        );
    
        return uploaded_files;
    }
}
