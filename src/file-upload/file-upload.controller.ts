import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, UseGuards } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { FileUploadService } from './file-upload.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('file-upload')
export class FileUploadController {
  constructor(
    private fileUploadService: FileUploadService
  ) {}

  @Post('single')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingle(
    @UploadedFile() image: BufferedFile
  ) {
    return await this.fileUploadService.uploadSingle(image)
  }

  @Post('many')
  // @UseInterceptors(FileFieldsInterceptor('image'))
  @UseInterceptors(FilesInterceptor('image'))
  async uploadMany(
    @UploadedFiles() files: Array<BufferedFile>,
  ) {
    return this.fileUploadService.uploadMany(files)
  }
}