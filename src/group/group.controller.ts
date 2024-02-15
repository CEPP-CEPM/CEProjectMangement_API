import { Body, Controller, Get, Post } from '@nestjs/common';
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
    async findByGroupId() {

    }

    @Post()
    async create(@Body() createGroupDto: CreateGroupDto) {
        return await this.groupService.create(createGroupDto)
    }
}
