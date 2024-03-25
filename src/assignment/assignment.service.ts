import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BufferedFile } from 'src/minio-client/file.model';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { deleteAssignmentsFiles } from 'src/interfaces/deleteFiles.interface';
import { CreateAssignmentDto } from './dto/CreateAssignment.dto';
import { Users } from '@prisma/client';

@Injectable()
export class AssignmentService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly minioClientService: MinioClientService
    ) {}

    async findAll() {
        return this.prismaService.assignments.findMany()
    }

    async findBySubject(subject: string) {
        const subjectInfo = await this.prismaService.subject.findFirst({
            where: {
                subjectName: subject
            }
        })

        return this.prismaService.assignments.findMany({
            where: {
                subjectId: subjectInfo.id
            }
        })
    }

    async findOne(id: string) {
        const assignment = await this.prismaService.assignments.findUnique({
            where : {
                id: id
            },
            include : {
                AssignmentFiles: true
            }
        })
        const proctor = await this.prismaService.users.findUnique({
            where : {
                id: assignment.proctorId
            }
        })
        return [assignment, proctor]
    }

    async create(createAssignmentDto: CreateAssignmentDto, files: BufferedFile[], user: Users) {

        const proctor = await this.prismaService.users.findUnique({ where: {id: user.id}})
        console.log(proctor);
        

        const subject = await this.prismaService.subject.findFirst({
            where: {
                subjectName: createAssignmentDto.subjectName
            }
        })

        if (files && files.length > 0) {
            const assignment = await this.prismaService.assignments.create({
                data: {
                    title: createAssignmentDto.title,
                    description: createAssignmentDto.description,
                    dueAt: createAssignmentDto.dueAt,
                    Subject: {
                        connect: {id: subject.id}
                    },
                    Users: {
                        connect: {id: proctor.id}
                    }
                },
                include: {
                    AssignmentFiles: true
                }
            })
            const uploadFiles = await this.uploadFiles(files)
            await Promise.all(
                uploadFiles.map(async (file) => {
                    const assignmentFile = await this.prismaService.assignmentFiles.create({
                        data: {
                            bucket: file.bucketName,
                            name: file.filename,
                            originalName: file.originalName,
                            Assignments: {
                                connect: { id: assignment.id }
                            }
                        }
                    })
                    return assignmentFile
                })
            )
            return assignment
        } else {
            const assignment = await this.prismaService.assignments.create({
                data: {
                    title: createAssignmentDto.title,
                    description: createAssignmentDto.description,
                    dueAt: createAssignmentDto.dueAt,
                    Subject: {
                        connect: {id: subject.id}
                    },
                    Users: {
                        connect: {id: proctor.id}
                    }
                },
                include: {
                    AssignmentFiles: true
                }
            })
            return assignment
        }
    }

    async update(id: string, updateAssignmentDto: Prisma.AssignmentsUpdateInput, files: BufferedFile[]) {
        const updateAssignment = await this.prismaService.assignments.update({
            where: {
                id: id
            },
            data: {
                title: updateAssignmentDto.title,
                description: updateAssignmentDto.description,
                dueAt: updateAssignmentDto.dueAt
            },
            include: {
                AssignmentFiles: true
            }
        })

        const filesInAssign = await this.prismaService.assignmentFiles.findMany({where:{assignmentId:id}})
        await Promise.all(filesInAssign.map( async (file) =>{
            await this.prismaService.assignmentFiles.delete({where:{id: file.id}})
        }))
        
        if (files && files.length > 0) {
            const uploadFiles = await this.uploadFiles(files)
            await Promise.all(
                uploadFiles.map(async (fileuploadFile) => {
                    const assignmentFile = await this.prismaService.assignmentFiles.create({
                        data: {
                            bucket: fileuploadFile.bucketName,
                            name: fileuploadFile.filename,
                            originalName: fileuploadFile.originalName,
                            Assignments: { connect: { id: id } },
                        }
                    })
                    return assignmentFile
                })
            )
        }
        return updateAssignment
    }

    async deleteById(id: string) {

        const findAllAssignmentFiles = await this.prismaService.assignmentFiles.findMany({
            where : { assignmentId: id }
        })
        await this.deleteFiles(findAllAssignmentFiles)
        
        return await this.prismaService.assignments.delete({ where : { id: id}})
    }

    private async deleteFiles(files: deleteAssignmentsFiles[]) {
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
                'assignment',
                );
                return uploaded_file;
            }),
        );
    
        return uploaded_files;
    }
}
