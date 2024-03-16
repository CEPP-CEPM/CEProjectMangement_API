import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
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
    async findAll() {
        return await this.groupService.findAll()
    }

    @Get('student/advisor/:groupId')
    async findAdvisorGroup(@Param('groupId') groupId: string) {
        return await this.groupService.findByAdvisorId(groupId)
    }

    @Get(':groupId')
    async findByGroupId(@Param('groupId') groupId: string) {
        return await this.groupService.findByGroupId(groupId)
    }

    @Get('advisor/:advisorId')
    async findByAdvisorId(@Param('advisorId') advisorId: string) {
        return await this.groupService.findByAdvisorId(advisorId)
    }

    @UseGuards(JwtAuthGuard)
    @Get('student/member/1')
    async findMemberByGroupId(@Request() req) {
        return await this.groupService.findMemberByGroupId(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('student/check/1')
    async check(@Request() req) {
        return await this.groupService.checkJoinByStudent(req.user)
    }

    @Post()
    async create(@Body() createGroupDto: CreateGroupDto) {
        return await this.groupService.create(createGroupDto)
    }

    @Put(':groupId')
    async update(@Param('groupId') groupId: string, @Body() updateGroupDto: UpdateGroupDto) {
        return await this.groupService.update(groupId, updateGroupDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/student/join')
    async acceptGroup(@Request() req){
        return await this.groupService.acceptGroup(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/student/reject')
    async rejectGroup(@Request() req){
        return await this.groupService.rejectGroup(req.user)
    }
}
