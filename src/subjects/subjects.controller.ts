import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateSubjectDto } from './dto/createSubject.dto';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  async findAllSubjects() {
    return await this.subjectsService.findAllSubject();
  }

  @Get(':id')
  async findByUserId(@Param('id') id: string) {
    return await this.subjectsService.findByUserId(id)
  }

  @Post()
  async createSubject(@Body() createSubjectDto: CreateSubjectDto) {
    return await this.subjectsService.createSubject(createSubjectDto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return await this.subjectsService.deleteSubject(id);
  }
}
