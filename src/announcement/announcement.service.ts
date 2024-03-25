import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { deleteAnnouncementsFiles } from 'src/interfaces/deleteFiles.interface';
import { CreateAnnouncementDto } from './dto/CreateAnnouncement.dto';
import { Users } from '@prisma/client';

@Injectable()
export class AnnouncementService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly minioClientService: MinioClientService
    ) {}

    async findAllAnnouncement() {
        return await this.prismaService.announcements.findMany()
    }

    async findOneAnnouncement(id: string) {
        const announcement = await this.prismaService.announcements.findUnique({
            where : {
                id: id
            },
            include : {
                AnnouncementFiles: true
            }
        })
        const proctor = await this.prismaService.users.findUnique({
            where : {
                id: announcement.proctorId
            }
        })
        return [announcement, proctor]
    }

    async findBySubject(subject: string) {
        const subjectInfo = await this.prismaService.subject.findFirst({
            where: {
                subjectName: subject
            }
        })

        return this.prismaService.announcements.findMany({
            where: {
                subjectId: subjectInfo.id
            }
        })
    }

    async createAnnouncement(createAnnouncementDto: CreateAnnouncementDto, files: BufferedFile[], user: Users) {
        const proctor = await this.prismaService.users.findUnique({
            where: {
                id: user.id
            }
        })
        
        const subject = await this.prismaService.subject.findFirst({
            where: {
                subjectName : createAnnouncementDto.subjectName
            }
        })
        console.log(createAnnouncementDto.subjectName);

        if (files && files.length > 0) {
            const announcement = await this.prismaService.announcements.create({
                data: {
                    title: createAnnouncementDto.title,
                    description: createAnnouncementDto.description,
                    Users: {
                        connect: { id: proctor.id },
                    },
                    Subject: {
                        connect: { id: subject.id},
                    }
                },
                include: {
                    AnnouncementFiles: true,
                },
            });
            const uploadFiles = await this.uploadFiles(files);
            await Promise.all(
                uploadFiles.map(async (fileuploadFile) => {
                    console.log(fileuploadFile);
                    const announcementFile = await this.prismaService.announcementFiles.create({
                        data: {
                            bucket: fileuploadFile.bucketName,
                            name: fileuploadFile.filename,
                            originalName:fileuploadFile.originalName,
                            Announcements: {
                                connect: { id: announcement.id },
                            },
                        },
                    });
                    return announcementFile;
                }),
            );
            return announcement;
        } else {
            const announcement = await this.prismaService.announcements.create({
                data: {
                    title: createAnnouncementDto.title,
                    description: createAnnouncementDto.description,
                    Users: {
                        connect: { id: proctor.id },
                    },
                    Subject: {
                        connect: { id: subject.id},
                    }
                },
                include: {
                    AnnouncementFiles: false,
                },
            });
            return announcement;
        }
    }

    async updateAnnouncement(id: string, updateAnnouncementDto: Prisma.AnnouncementsUpdateInput, files: BufferedFile[]) {
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
        const filesInAnnounce = await this.prismaService.announcementFiles.findMany({where:{announcementId:id}})
        await Promise.all(filesInAnnounce.map( async (file) =>{
            await this.prismaService.announcementFiles.delete({where:{id: file.id}})
        }))

        if (files && files.length > 0) {
            const uploadFiles = await this.uploadFiles(files);
            await Promise.all(
                uploadFiles.map(async (fileuploadFile) => {                    
                    const announcementFile = await this.prismaService.announcementFiles.create({
                        data: {
                            bucket: fileuploadFile.bucketName,
                            name: fileuploadFile.filename,
                            originalName: fileuploadFile.originalName,
                            Announcements: { connect: { id: id } },
                        },
                    });
                    return announcementFile;
                }),
            );
        }
        return updateAnnouncement;
    }

    async deleteById(id: string) {
        const findAllAnnouncementFiles = await this.prismaService.announcementFiles.findMany({
            where : { announcementId: id }
        })
        await this.deleteFiles(findAllAnnouncementFiles)
        
        return await this.prismaService.announcements.delete({ where : { id: id}})
    }

    private async deleteFiles(files: deleteAnnouncementsFiles[]) {
        await Promise.all(
            files.map(async (file) => {
                await this.minioClientService.delete(
                    file.name,
                    file.bucket
                )
            })
        )
    }

    private async uploadFiles(files: BufferedFile[]) {
        const uploaded_files = await Promise.all(
            files.map(async (file) => {
                const uploaded_file = await this.minioClientService.upload(
                file,
                'announcement',
                );
                return uploaded_file;
            }),
        );
        return uploaded_files;
    }
}
