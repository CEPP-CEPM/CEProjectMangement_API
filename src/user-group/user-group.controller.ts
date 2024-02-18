import { Controller, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserGroupService } from './user-group.service';

@ApiTags('user-group')
@Controller('user-group')
export class UserGroupController {

    constructor(private readonly userGroupService: UserGroupService) {}

    @Get()
    async findAll() {
        return await this.userGroupService.findAll()
    }

    @Get(':id')
    async findByUserGroupId(@Param('id') id: string) {
        return await this.userGroupService.findByUserGroupId(id)
    }

    @Get('group/:groupId')
    async findByGroupId(@Param('groupId') groupId: string) {
        return await this.userGroupService.findByGroupId(groupId)
    }

    @Put(':id')
    async updateStatus(@Param('id') id: string, join: boolean) {
        return await this.userGroupService.update(id, join)
    }
}
