import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Readable } from 'stream';
import { parse } from 'papaparse';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll() {
        return await this.prismaService.users.findMany()
    }

    async findStudent() {
        return await this.prismaService.users.findMany({where: {role: 'STUDENT'}})
    }

    async findAdvisor() {
        return await this.prismaService.users.findMany({where: {role: 'ADVISOR'}})
    }

    async addUsers(file: Express.Multer.File, subjectName: string) {
        let header = true
        const stream = Readable.from(file.buffer)
        const csvData = parse(stream, {
            header: false,
            worker: true,
            delimiter: ",",
            step: async (row) => {
                console.log("Row: ", row.data);
                if (!header) {
                    try {
                        const subject = await this.prismaService.subject.findFirst({
                            where: {
                                subjectName: subjectName
                            }
                        })

                        await this.prismaService.users.create({
                            data: {
                                email: row.data[1],
                                name: row.data[2],
                                lastname: row.data[3],
                                tel: row.data[4],
                                role: row.data[5],
                                Subject: {
                                    connect: {id: subject.id}
                                }
                            }
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }
                header = false
            }
        })
        
        return csvData
    }
}
