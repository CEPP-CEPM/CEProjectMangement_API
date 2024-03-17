import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubjectsService {

    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    async findAllSubject() {
        // return this.prismaService
    }

    async createSubject(subject: string) {
        return
    }

}
