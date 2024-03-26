import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './file.model';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioClientService {
  constructor(
    private readonly minio: MinioService,
    private readonly configService: ConfigService,
  ) {}

  public get client() {
    return this.minio.client;
  }

  public async upload(
    file: BufferedFile,
    baseBucket: string = this.configService.get<string>('minio.baseBucket'),
  ) {
    if (!file.mimetype.includes('pdf')) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }
    const temp_filename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    const filename = hashedFileName + ext;
    const fileName: string = `${filename}`;
    const fileBuffer = file.buffer;
    this.client.putObject(
      baseBucket,
      fileName,
      fileBuffer,
      file.size,
      metaData,
      function (err) {
        if (err) throw new HttpException(err, HttpStatus.BAD_REQUEST);
      },
    );

    return {
      url: `${this.configService.get<string>('minio.endpoint')}/${baseBucket}/${filename}`,
      bucketName: baseBucket,
      filename: fileName,
      originalName: file.originalname,
    };
  }

  async delete(objetName: string, baseBucket: string) {
    this.client.removeObject(baseBucket, objetName);
  }
}
