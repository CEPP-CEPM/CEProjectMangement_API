import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/CreateGroup.dto';
import { UpdateGroupDto } from './dto/UpdateGroup.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('group')
@Controller('group')
export class GroupController {
    
    constructor(private readonly groupService: GroupService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
        return await this.groupService.findAll()
    }

    @Get('student/advisor/:groupId')
    @UseGuards(JwtAuthGuard)
    async findAdvisorGroup(@Param('groupId') groupId: string) {
        return await this.groupService.findByAdvisorId(groupId)
    }

    @Get(':groupId')
    @UseGuards(JwtAuthGuard)
    async findByGroupId(@Param('groupId') groupId: string) {
        return await this.groupService.findByGroupId(groupId)
    }

    @Get('advisor/:advisorId')
    @UseGuards(JwtAuthGuard)
    async findByAdvisorId(@Param('advisorId') advisorId: string) {
        return await this.groupService.findByAdvisorId(advisorId)
    }

    @Get('student/:groupId')
    @UseGuards(JwtAuthGuard)
    async findMemberByGroupId(@Param('groupId') groupId: string) {
        return await this.groupService.findMemberByGroupId(groupId)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createGroupDto: CreateGroupDto) {
        return await this.groupService.create(createGroupDto)
    }

    @Put(':groupId')
    @UseGuards(JwtAuthGuard)
    async update(@Param('groupId') groupId: string, @Body() updateGroupDto: UpdateGroupDto) {
        return await this.groupService.update(groupId, updateGroupDto)
    }
}
