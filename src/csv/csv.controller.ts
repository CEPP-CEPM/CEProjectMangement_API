import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CsvService } from './csv.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('csv')
export class CsvController {
    constructor(
        private readonly csvService: CsvService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async readCSV(@UploadedFile() file: Express.Multer.File) {
        return await this.csvService.readCSV(file)
    }
}
