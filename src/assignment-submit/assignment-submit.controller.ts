import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssignmentSubmitService } from './assignment-submit.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/minio-client/file.model';
import { CreateAssignmentSubmitDto } from './dto/create-assignmentSubmit.dto';
import { Users } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { UpdateProtorDto } from './dto/update-assiggnmentSubmit.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('assignment-submit')
@Controller('assignment-submit')
export class AssignmentSubmitController {
    constructor(
        private readonly assignmentSubmitService: AssignmentSubmitService,
    ) { }

    @Get()
    async findAll() {
        return await this.assignmentSubmitService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get('/student/:assignId')
    async findOne(@Param('assignId') assignId: string, @Request() req) {
        return await this.assignmentSubmitService.findOne(assignId, req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/student/file/:assignId')
    async findOneSubmitFiles(@Param('assignId') assignId: string, @Request() req) {
        return await this.assignmentSubmitService.findOneSubmitFiles(assignId, req.user)
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return await this.assignmentSubmitService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    @UseInterceptors(FilesInterceptor('files'))
    async create(
        @UploadedFiles()
        files: BufferedFile[],
        @Body() createAssignmentSubmit: CreateAssignmentSubmitDto,
        @Request() req
    ) {
        if (files != undefined && files.length > 0) {
            return await this.assignmentSubmitService.createAssignmentSubmit(
                files,
                createAssignmentSubmit,
                req.user,
            );
        } else {
            return await this.assignmentSubmitService.create(
                createAssignmentSubmit,
                req.user,
            );
        }
    }

    @Put('/advisor/:id')
    @Roles(Role.ADVISOR)
    async updateByAdvisor(
        @Param('id') id: string,
        @Body() updateProtorDto: UpdateProtorDto,
    ) {
        return await this.assignmentSubmitService.updateByAdvisor(
            id,
            updateProtorDto,
        );
    }

    // @Delete(':id')
    // async deleteFile(@Param('id') id: string, user: Users) {
    //     return await this.assignmentSubmitService.deleteFile(id, user);
    // }

    @UseGuards(JwtAuthGuard)
    @Delete('/student/:id')
    async cancelSubmit(@Param('id') id: string, @Request() req) {
        return await this.assignmentSubmitService.cancelSubmit(id, req.user)
    }

}