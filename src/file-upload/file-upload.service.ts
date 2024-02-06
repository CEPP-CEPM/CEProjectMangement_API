import { Injectable, UploadedFiles } from '@nestjs/common';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';

@Injectable()
export class FileUploadService {
  constructor(
    private minioClientService: MinioClientService
  ) {}

  async uploadSingle(image: BufferedFile) {

    let uploaded_image = await this.minioClientService.upload(image)

    return {
      image_url: uploaded_image.url,
      message: "Successfully uploaded to MinIO S3"
    }
  }

  async uploadMany(files: Array<BufferedFile>) {

    // let image1 = files['image']
    // let uploaded_image1 = await this.minioClientService.upload(image1)

    // let image2 = files['image']
    // let uploaded_image2 = await this.minioClientService.upload(image2)

    // const uploadFiles = await 

    console.log(files)

    const uploadedFiles = files.map(async (file) => {
      const upload = await this.minioClientService.upload(file)
      return upload
    })

    const uploaded = await Promise.all(uploadedFiles);

    return {
      image_url: uploaded,
      message: 'Successfully uploaded mutiple image on MinioS3'
    }
  }
}