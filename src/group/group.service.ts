import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupDto } from './dto/CreateGroup.dto';

@Injectable()
export class GroupService {

    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    async findAll() {
        return await this.prismaService.groups.findMany()
    }

    async findByGroupId(id: string) {
        return await this.prismaService.groups.findUnique({
            where: {
                id: id
            }
        })
    }

    async create(createGroupDto: CreateGroupDto) {

        let alreadyGroup = []

        await Promise.all(
            createGroupDto.userGroup.map(async (email) => {
                const user = await this.prismaService.users.findUnique({where: {email: email}})
                if (await this.prismaService.userGroups.findUnique({where: {studentId: user.id}})) {
                    alreadyGroup.push(user.email)
                }
            })
        )

        if(alreadyGroup.length > 0) {
            throw new HttpException({
                alreadyGroup: alreadyGroup,
                // message: `${alreadyGroup}`
        }, HttpStatus.BAD_REQUEST)
        }

        const group = await this.prismaService.groups.create({
            data: {
                topic: createGroupDto.topic,
                tag: createGroupDto.tag,
            },
            include: {
                UserGroups: true
            }
        })

        await Promise.all(
            createGroupDto.userGroup.map(async (email) => {
                const userId = await this.prismaService.users.findUnique({where: {email: email}})
                const userGroup = await this.prismaService.userGroups.create({
                    data: {
                        Users: {
                            connect: {id: userId.id}
                        },
                        Groups: {
                            connect: {id: group.id}
                        }
                    }
                })
                return userGroup
            })
        )
        return group
    }

    async update(id: string, createGroupDto: CreateGroupDto) {
        const group = await this.prismaService.groups.findUnique({where: {id: id}})

        // const userGroup = await
    }
}
