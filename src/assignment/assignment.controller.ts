import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssignmentService } from './assignment.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/minio-client/file.model';
import { CreateAssignmentDto } from './dto/CreateAssignment.dto';
import { UpdateAssignmentDto } from './dto/UpdateAssignment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('assignment')
@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.assignmentService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.assignmentService.findOne(id);
  }

  @Get('student/:id')
  async findByStd() {}

  @Get('/subject/:subject')
  @UseGuards(JwtAuthGuard)
  async findBySubject(@Param('subject') subject: string) {
    return await this.assignmentService.findBySubject(subject);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @UploadedFiles() files: BufferedFile[],
    @Body() createAssignmentDto: CreateAssignmentDto,
    @Request() req,
  ) {
    return await this.assignmentService.create(
      createAssignmentDto,
      files,
      req.user,
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: BufferedFile[],
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return await this.assignmentService.update(id, updateAssignmentDto, files);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id') id: string) {
    return await this.assignmentService.deleteById(id);
  }
}
