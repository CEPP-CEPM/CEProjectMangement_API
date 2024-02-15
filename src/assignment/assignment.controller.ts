import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssignmentService } from './assignment.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/minio-client/file.model';
import { CreateAssignmentDto } from './dto/CreateAssignment.dto';
import { UpdateAssignmentDto } from './dto/UpdateAssignment.dto';

@ApiTags('assignment')
@Controller('assignment')
export class AssignmentController {

    constructor(private readonly assignmentService: AssignmentService){}

    @Get()
    async findAll() {
        return await this.assignmentService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.assignmentService.findOne(id)
    }

    @Get('student/:id')
    async findByStd() {

    }

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async create(@UploadedFiles() files: BufferedFile[], @Body() createAssignmentDto: CreateAssignmentDto) {
        return await this.assignmentService.create(createAssignmentDto, files)
    }

    @Put(':id')
    @UseInterceptors(FilesInterceptor('files'))
    async update(@Param('id') id: string, @UploadedFiles() files: BufferedFile[], @Body() updateAssignmentDto: UpdateAssignmentDto) {
        return await this.assignmentService.update(id, updateAssignmentDto, files)
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string) {
        return await this.assignmentService.deleteById(id)
    }
}
