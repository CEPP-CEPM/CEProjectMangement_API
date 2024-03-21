import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectDto } from './dto/createSubject.dto';

@Injectable()
export class SubjectsService {

    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    async findAllSubject() {
        return this.prismaService.subject.findMany()
    }

    async createSubject(createSubject: CreateSubjectDto) {
        return this.prismaService.subject.create({
            data: {
                subjectName: createSubject.subject
            }
        })
    }

    async deleteSubject(id : string) {
        return this.prismaService.subject.delete({
            where: {
                id: id
            }
        })
    }

}
