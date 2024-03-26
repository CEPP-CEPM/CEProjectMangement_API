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
    @UseGuards(JwtAuthGuard)
    async findAll() {
        return await this.groupService.findAll()
    }

    // @Get('student/advisor/:groupId')
    // @UseGuards(JwtAuthGuard)
    // async findAdvisorGroup(@Param('groupId') groupId: string) {
    //     return await this.groupService.findByAdvisorId(groupId)
    // }

    @Get(':groupId')
    @UseGuards(JwtAuthGuard)
    async findByGroupId(@Param('groupId') groupId: string) {
        return await this.groupService.findByGroupId(groupId)
    }

    @Get('advisor/1')
    @UseGuards(JwtAuthGuard)
    async findByAdvisorId(@Request() req) {
        console.log("test");
        
        return await this.groupService.findByAdvisorId(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('student/member')
    async findMemberByStudent(@Request() req) {
        return await this.groupService.findMemberByStudent(req.user)
    }

    @Get('proctor/student/:groupId')
    async findMemberByGroupId(@Param('groupId') groupId: string) {
        return await this.groupService.findMemberByGroupId(groupId)
    }

    @UseGuards(JwtAuthGuard)
    @Get('student/check')
    async check(@Request() req) {
        return await this.groupService.checkJoinByStudent(req.user)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createGroupDto: CreateGroupDto,@Request() req) {
        return await this.groupService.create(createGroupDto,req.user)
    }

    @Put(':groupId')
    @UseGuards(JwtAuthGuard)
    async update(@Param('groupId') groupId: string, @Body() updateGroupDto: UpdateGroupDto) {
        return await this.groupService.update(groupId, updateGroupDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/student/invite')
    async acceptGroup(@Request() req){
        return await this.groupService.acceptGroup(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/student/invite')
    async rejectGroup(@Request() req){
        return await this.groupService.rejectGroup(req.user)
    }
}
