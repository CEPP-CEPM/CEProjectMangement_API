import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AssignmentStatus, Prisma, Users } from '@prisma/client';
import { BufferedFile } from 'src/minio-client/file.model';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssignmentSubmitDto } from './dto/create-assignmentSubmit.dto';
import { UpdateProtorDto } from './dto/update-assiggnmentSubmit.dto';

@Injectable()
export class AssignmentSubmitService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly minioClientService: MinioClientService
    ) { }

    async findAll() {
        return this.prismaService.assignments.findMany()
    }

    async findOne(id: string) {
        return this.prismaService.assignments.findUnique({
            where: {
                id: id
            },
            include: {
                AssignmentFiles: true
            }
        })
    }

    async findById(id: string) {
        try {
            const assignmentSubmit =
                await this.prismaService.assignmentSubmit.findUnique({
                    where: { id: id },
                    include: { Assignments: true },
                });
            if (!assignmentSubmit) throw new NotFoundException();
            return assignmentSubmit;
        } catch (err) {
            return err.response;
        }
    }

    async createAssignmentSubmit(files: BufferedFile[], createAssignmentSubmitDto: CreateAssignmentSubmitDto, user: Users) {
        try {
            const assignment = await this.prismaService.assignments.findUnique({
                where: { id: createAssignmentSubmitDto.assignmentId },
            });
            const userGroup = await this.prismaService.userGroups.findUnique({
                where: { userId: user.id }
            })
            const assignCheck = await this.prismaService.assignmentSubmit.findUnique({
                where: {
                    assignmentId: createAssignmentSubmitDto.assignmentId,
                    groupId: userGroup.groupId,
                },
            });
            const assignmentSubmit = await this.prismaService.assignmentSubmit.create(
                {
                    data: {
                        assignmentId: createAssignmentSubmitDto.assignmentId,
                        groupId: userGroup.groupId,
                        status: 'SEND',
                    },
                    include: { Assignments: true },
                },
            );
            // const uploads = await Promise.all(
            //     files.map(async file => {
            //         const upload = await this.minioClientService.upload(file, "submit")
            //         return upload
            //     })
            // )
            // const uploadFileData = await Promise.all(
            //     uploads.map(async upload => {
            //         return {
            //             name: upload.filename,
            //             bucket: upload.bucketName,
            //             assignmentSubmitId: assignmentSubmit.id,
            //         }
            //     })
            // )
            const uploadFiles = await this.uploadFiles(files)
            // console.log(uploadFiles)
            await Promise.all(
                uploadFiles.map(async (file) => {
                    const assignmentFile = await this.prismaService.assignmentFiles.create({
                        data: {
                            bucket: file.bucketName,
                            name: file.filename,
                            Assignments: {
                                connect: { id: assignment.id }
                            }
                        }
                    })
                    return assignmentFile
                })
            )
            return assignmentSubmit
        } catch (error) {

        }
    }

    checkCodeIsExpire(expireDate: Date): boolean {
        const today = new Date();
        if (today >= expireDate) {
            return true;
        } else {
            return false;
        }
    }

    async create(createAssignmentSubmit: CreateAssignmentSubmitDto, user: Users) {
        try {
            const assignment = await this.prismaService.assignments.findUnique({
                where: { id: createAssignmentSubmit.assignmentId },
            });
            if (!assignment) throw new NotFoundException();
            const userGroup = await this.prismaService.userGroups.findUnique({
                where: { userId: user.id },
            });
            if (!userGroup) throw new ForbiddenException();
            const assignCheck = await this.prismaService.assignmentSubmit.findUnique({
                where: {
                    assignmentId: createAssignmentSubmit.assignmentId,
                    groupId: userGroup.groupId,
                },
            });
            if (assignCheck) throw new ConflictException();
            const check = this.checkCodeIsExpire(assignment.dueAt);
            if (check) {
                const assignmentSubmit =
                    await this.prismaService.assignmentSubmit.create({
                        data: {
                            Assignments: {
                                connect: { id: createAssignmentSubmit.assignmentId },
                            },
                            status: 'TURNINLATE',
                            Groups: { connect: { id: userGroup.groupId } },
                        },
                        include: { Assignments: true },
                    });
                return assignmentSubmit;
            } else {
                const assignmentSubmit =
                    await this.prismaService.assignmentSubmit.create({
                        data: {
                            Assignments: {
                                connect: { id: createAssignmentSubmit.assignmentId },
                            },
                            status: 'SEND',
                            Groups: { connect: { id: userGroup.groupId } },
                        },
                        include: { Assignments: true },
                    });
                return assignmentSubmit;
            }
        } catch (err) {
            return err.response;
        }
    }

    async updateByAdvisor(id: string, updateProtorDto: UpdateProtorDto) {
        try {
            const assignmentSubmit =
                await this.prismaService.assignmentSubmit.findUnique({
                    where: { id: id },
                });
            if (assignmentSubmit.status != 'SEND') throw new ForbiddenException();
            if (updateProtorDto.status == AssignmentStatus.APPROVE) {
                const submit = await this.prismaService.assignmentSubmit.update({
                    data: { status: 'APPROVE' },
                    where: { id: id },
                });
                return submit;
            } else if (updateProtorDto.status == AssignmentStatus.REJECT) {
                const submit = await this.prismaService.assignmentSubmit.update({
                    data: { status: 'REJECT' },
                    where: { id: id },
                });
                return submit;
            }
            throw new ForbiddenException();
        } catch (err) {
            return err.response;
        }
    }

    async cancleAssignment(id: string, user: Users) {
        try {
            const assignment = await this.prismaService.assignmentSubmit.findUnique({
                where: { id: id },
                include: { Assignments: true },
            });
            if (!assignment) throw new NotFoundException();
            const userGroup = await this.prismaService.userGroups.findUnique({
                where: { userId: user.id },
            });
            if (!userGroup) throw new NotFoundException();
            if (assignment.status !== 'SEND') throw new ForbiddenException();
            return await this.prismaService.assignmentSubmit.update({
                data: { status: 'NOTSEND' },
                where: { id: id },
            });
        } catch (err) {
            return err.response;
        }
    }

    async deleteFile(id: string, user: Users) {
        try {
            const file = await this.prismaService.assignmentSubmitFiles.findUnique({
                where: { id: id },
                include: { AssignmentSubmit: { include: { Assignments: true } } },
            });
            if (!file) throw new NotFoundException();
            const group = await this.prismaService.userGroups.findUnique({
                where: {
                    userId: user.id,
                    groupId: file.AssignmentSubmit.groupId,
                },
            });
            if (!group) throw new ForbiddenException();
            await this.minioClientService.delete(file.name, 'submit');
            await this.prismaService.assignmentSubmitFiles.delete({
                where: { id: id },
            });
        } catch (err) {
            return err.response;
        }
    }


    private async uploadFiles(files: BufferedFile[]) {
        const uploaded_files = await Promise.all(
            files.map(async (file) => {
                const uploaded_file = await this.minioClientService.upload(
                    file,
                    'assignment',
                );
                return uploaded_file;
            }),
        );

        return uploaded_files;
    }



}