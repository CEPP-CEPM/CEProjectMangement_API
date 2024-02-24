import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/CreateGroup.dto';
import { UpdateGroupDto } from './dto/UpdateGroup.dto';

@ApiTags('group')
@Controller('group')
export class GroupController {
    
    constructor(private readonly groupService: GroupService) {}

    @Get()
    async findAll() {
        return await this.groupService.findAll()
    }

    @Get(':groupId')
    async findByGroupId(@Param('groupId') groupId: string) {
        return await this.groupService.findByGroupId(groupId)
    }

    @Get('advisor/:advisorId')
    async findByAdvisorId(@Param('advisorId') advisorId: string) {
        return await this.groupService.findByAdvisorId(advisorId)
    }

    @Post()
    async create(@Body() createGroupDto: CreateGroupDto) {
        return await this.groupService.create(createGroupDto)
    }

    @Put(':groupId')
    async update(@Param('groupId') groupId: string, @Body() updateGroupDto: UpdateGroupDto) {
        return await this.groupService.update(groupId, updateGroupDto)
    }
}
