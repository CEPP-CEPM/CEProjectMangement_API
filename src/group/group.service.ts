import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupDto } from './dto/CreateGroup.dto';
import { UpdateGroupDto } from './dto/UpdateGroup.dto';

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
            },
            include: {
                UserGroups: true
            }
        })
    }

    async findByAdvisorId(id: string) {
        return await this.prismaService.groups.findMany({
            where:{
                createBy: id
            }
        })
    }

    async findMemberByGroupId(id: string){
        const userGroup = await this.prismaService.userGroups.findMany({where: {groupId: id}})
        const member = await Promise.all( userGroup.map(async (user) => {
            return await this.prismaService.users.findUnique({where:{id:user.studentId}})
        }) )
        return member
    }

    async create(createGroupDto: CreateGroupDto) {

        let alreadyGroup = []

        await Promise.all(
            createGroupDto.userGroup.map(async (email) => {
                const user = await this.prismaService.users.findUnique({where: {email: email}})
                if(user.role != "STUDENT"){
                    throw new HttpException({
                        message: `${"is not Student"}`
                }, HttpStatus.BAD_REQUEST)
                }
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
                Users: {
                    connect: {id:createGroupDto.userId}
                },
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

    async update(id: string, updateGroupDto: UpdateGroupDto) {
        const group = await this.prismaService.groups.findUnique({where: {id: id}})

        if (updateGroupDto.addUsers) {
            let alreadyGroup = []

            await Promise.all(
                updateGroupDto.addUsers.map(async (user) => {
                    const addUserId = await this.prismaService.users.findUnique({where: {email: user}})
                    if (await this.prismaService.userGroups.findUnique({where: {studentId: addUserId.id}})) {
                        alreadyGroup.push(addUserId.email)
                    }

                    if(alreadyGroup.length > 0) {
                        throw new HttpException({
                            alreadyGroup: alreadyGroup,
                            // message: `${alreadyGroup}`
                    }, HttpStatus.BAD_REQUEST)
                    }
                    
                    await this.prismaService.userGroups.create({
                        data: {
                            Users: {
                                connect: {id: addUserId.id}
                            },
                            Groups: {
                                connect: {id: group.id}
                            }
                        }
                    })
                })
            )
        }

        if (updateGroupDto.deleteUsers) {
            await Promise.all(
                updateGroupDto.deleteUsers.map(async (user) => {
                    const deleteUserId = await this.prismaService.users.findUnique({where: {email: user}})
                    await this.prismaService.userGroups.delete({where: {id: deleteUserId.id}})
                })
            )
        }


        const updateGroup = await this.prismaService.groups.update({
            where: {
                id: id,
            },
            data: {
                topic: updateGroupDto.topic,
                tag: updateGroupDto.topic,
            },
            include: {
                UserGroups: true
            }
        })
        return updateGroup
    }
}
