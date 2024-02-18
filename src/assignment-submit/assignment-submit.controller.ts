import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssignmentSubmitService } from './assignment-submit.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/minio-client/file.model';
import { CreateAssignmentSubmitDto } from './dto/create-assignmentSubmit.dto';
import { Users } from '@prisma/client';

@ApiTags('assignment-submit')
@Controller('assignment-submit')
export class AssignmentSubmitController {
    constructor(
        private readonly assignmentSubmitService: AssignmentSubmitService,
    ) { }

    @Post('')
    @UseInterceptors(FilesInterceptor('files'))
    async create(
        @UploadedFiles()
        files: BufferedFile[],
        @Body() createAssignmentSubmit: CreateAssignmentSubmitDto,
        user: Users,
    ) {
        if (files != undefined && files.length > 0) {
            return await this.assignmentSubmitService.createAssignmentSubmit(
                files,
                createAssignmentSubmit,
                user,
            );
        } else {
            return await this.assignmentSubmitService.create(
                createAssignmentSubmit,
                user,
            );
        }
    }

    @Delete(':id')
    async deleteFile(@Param('id') id: string, user: Users) {
        return await this.assignmentSubmitService.deleteFile(id, user);
    }
}


 