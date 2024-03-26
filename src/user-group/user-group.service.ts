import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserGroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.userGroups.findMany();
  }

  async findByUserGroupId(id: string) {
    return await this.prismaService.userGroups.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findByGroupId(groupId: string) {
    return await this.prismaService.userGroups.findMany({
      where: {
        groupId: groupId,
      },
    });
  }

  async update(id: string, status: boolean) {
    const updateStatus = await this.prismaService.userGroups.update({
      where: {
        id: id,
      },
      data: {
        join: status,
      },
    });
    return updateStatus;
  }
}
