import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PostModule } from './announcement/announcement.module';
// import { TagModule } from './tag/tag.module';
import { PrismaModule } from './prisma/prisma.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
      // PostModule,
      // TagModule,
      PrismaModule,
      MinioClientModule,
      FileUploadModule,
      AuthModule,
      UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
