import { Controller, Get, UseGuards, Request, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll() {
        return await this.usersService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }

    @Get('Advisor')
    async findAdvisor() {
        return await this.usersService.findAdvisor()
    }

    @Post()
    @UseInterceptors(FileInterceptor('files'))
    async addUsers(@Body() subjectName: string , @UploadedFile() file: Express.Multer.File) {
        return await this.usersService.addUsers(file, subjectName)
    }

}
