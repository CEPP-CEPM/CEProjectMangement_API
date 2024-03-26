// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { CreateTagDto } from './dto/CreateTag.dto';
// import { TagService } from './tag.service';

// @Controller('tag')
// export class TagController {

//     constructor(
//         private readonly tagService: TagService,

//     ) {}

//     @Get()
//     async findAllTag() {
//         return await this.tagService.findAll()
//     }

//     @Post()
//     async createTag(@Body() createTagDto: CreateTagDto) {
//         return await this.tagService.create(createTagDto)
//     }
// }
