import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BufferedFile } from 'src/minio-client/file.model';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssignmentService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly minioClientService: MinioClientService
    ) {}

    async findAll() {
        return this.prismaService.assignments.findMany()
    }

    async findOne(id: string) {
        return this.prismaService.assignments.findUnique({where : {id: id}})
    }

    async create(createAssignmentDto: Prisma.AssignmentsCreateInput, files: BufferedFile[]) {
        const assignment = await this.prismaService.assignments.create({
            data: {
                title: createAssignmentDto.title,
                description: createAssignmentDto.description,
                dueAt: createAssignmentDto.dueAt
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
                        Assignments: {
                            connect: { id: assignment.id }
                        }
                    }
                })
                return assignmentFile
            })
        )
        return assignment
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

        const uploadFiles = await this.uploadFiles(files)
        await Promise.all(
            uploadFiles.map(async (fileuploadFile) => {
                const assignmentFile = await this.prismaService.assignmentFiles.create({
                    data: {
                        bucket: fileuploadFile.bucketName,
                        name: fileuploadFile.filename,
                        Assignments: { connect: { id: id } },
                    }
                })
                return assignmentFile
            })
        )
        return updateAssignment
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
