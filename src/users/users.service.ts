import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll() {
        return await this.prismaService.users.findMany()
    }

    async findStudent() {

    }

    async findAdvisor() {
        return await this.prismaService.users.findMany({where: {role: 'ADVISOR'}})
    }
}
