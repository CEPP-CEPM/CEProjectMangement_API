import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupDto } from './dto/CreateGroup.dto';
import { UpdateGroupDto } from './dto/UpdateGroup.dto';
import { Users } from '@prisma/client';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.groups.findMany();
  }

  async findByGroupId(id: string) {
    return await this.prismaService.groups.findUnique({
      where: {
        id: id,
      },
      include: {
        UserGroups: true,
      },
    });
  }

  async findByAdvisor(user: Users) {
    return await this.prismaService.groups.findMany({
      where: {
        createBy: user.id,
      },
    });
  }

  async findByAdvisorId(id: string) {
    return await this.prismaService.groups.findMany({
      where: {
        createBy: id,
      },
    });
  }
  

  async findAdvisorGroupByGroupId(id: string) {
    const group = await this.prismaService.groups.findUnique({
      where: { id: id },
    });
    return await this.prismaService.users.findUnique({
      where: { id: group.createBy },
    });
  }

  async findMemberByStudent(user: Users) {
    const userGroup = await this.prismaService.userGroups.findUnique({
      where: { studentId: user.id },
    });
    const group = await this.prismaService.groups.findUnique({
      where: { id: userGroup.groupId },
      include: {
        Users: true,
        UserGroups: { include: { Users: true } },
      },
    });
    return group;
  }

  async findMemberByGroupId(groupId: string) {
    // const userGroup = await this.prismaService.userGroups.findUnique({ where: { studentId: user.id } })
    const group = await this.prismaService.groups.findUnique({
      where: { id: groupId },
      include: {
        Users: true,
        UserGroups: { include: { Users: true } },
      },
    });
    return group;
  }

  async checkJoinByStudent(user: Users) {
    console.log(user);

    const userGroup = await this.prismaService.userGroups.findUnique({
      where: { studentId: user.id },
    });
    return userGroup.join;
  }

  async create(createGroupDto: CreateGroupDto, user: Users) {
    const alreadyGroup = [];

    await Promise.all(
      createGroupDto.userGroup.map(async (email) => {
        const user = await this.prismaService.users.findUnique({
          where: { email: email },
        });
        if (user.role != 'STUDENT') {
          throw new HttpException(
            {
              message: `${'is not Student'}`,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
        if (
          await this.prismaService.userGroups.findUnique({
            where: { studentId: user.id },
          })
        ) {
          alreadyGroup.push(user.email);
        }
      }),
    );
    if (alreadyGroup.length > 0) {
      throw new HttpException(
        {
          alreadyGroup: alreadyGroup,
          // message: `${alreadyGroup}`
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const group = await this.prismaService.groups.create({
      data: {
        topic: createGroupDto.topic,
        tag: createGroupDto.tag,
        Users: {
          connect: { id: user.id },
        },
      },
      include: {
        UserGroups: true,
      },
    });

    await Promise.all(
      createGroupDto.userGroup.map(async (email) => {
        const userId = await this.prismaService.users.findUnique({
          where: { email: email },
        });
        const userGroup = await this.prismaService.userGroups.create({
          data: {
            Users: {
              connect: { id: userId.id },
            },
            Groups: {
              connect: { id: group.id },
            },
          },
        });
        return userGroup;
      }),
    );
    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const group = await this.prismaService.groups.findUnique({
      where: { id: id },
    });

    if (updateGroupDto.addUsers) {
      const alreadyGroup = [];

      await Promise.all(
        updateGroupDto.addUsers.map(async (user) => {
          const addUserId = await this.prismaService.users.findUnique({
            where: { email: user },
          });
          if (
            await this.prismaService.userGroups.findUnique({
              where: { studentId: addUserId.id },
            })
          ) {
            alreadyGroup.push(addUserId.email);
          }

          if (alreadyGroup.length > 0) {
            throw new HttpException(
              {
                alreadyGroup: alreadyGroup,
                // message: `${alreadyGroup}`
              },
              HttpStatus.BAD_REQUEST,
            );
          }

          await this.prismaService.userGroups.create({
            data: {
              Users: {
                connect: { id: addUserId.id },
              },
              Groups: {
                connect: { id: group.id },
              },
            },
          });
        }),
      );
    }

    if (updateGroupDto.deleteUsers) {
      await Promise.all(
        updateGroupDto.deleteUsers.map(async (user) => {
          const deleteUserId = await this.prismaService.users.findUnique({
            where: { email: user },
          });
          await this.prismaService.userGroups.delete({
            where: { id: deleteUserId.id },
          });
        }),
      );
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
        UserGroups: true,
      },
    });
    return updateGroup;
  }

  async acceptGroup(user: Users) {
    const usergroup = await this.prismaService.userGroups.update({
      where: {
        studentId: user.id,
      },
      data: {
        join: true,
      },
    });
    return usergroup;
  }

  async rejectGroup(user: Users) {
    const checkJoin = await this.prismaService.userGroups.findUnique({
      where: { studentId: user.id },
    });
    if (checkJoin.join) throw new BadRequestException();
    const usergroup = await this.prismaService.userGroups.delete({
      where: { studentId: user.id },
    });
    const checkmember = await this.prismaService.userGroups.findFirst({
      where: { groupId: usergroup.groupId },
    });
    if (!checkmember) {
      await this.prismaService.groups.delete({
        where: { id: usergroup.groupId },
      });
    }
    return usergroup;
  }
}
