import { Injectable } from '@nestjs/common';
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
}
