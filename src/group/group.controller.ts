import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/CreateGroup.dto';

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
    async findByAdvisorId() {

    }

    @Post()
    async create(@Body() createGroupDto: CreateGroupDto) {
        return await this.groupService.create(createGroupDto)
    }

    @Put(':groupId')
    async update(@Param('groupId') groupId: string, @Body() createGroupDto: CreateGroupDto) {
        
    }
}
