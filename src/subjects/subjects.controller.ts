import { Controller, Delete, Get, Post } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {

    constructor(private readonly subjectsService: SubjectsService){}

    @Get()
    async findAllSubjects() {
        
    }

    @Post()
    async createSubject() {

    }

    @Delete(':id')
    async deleteById() {
        
    }
}
