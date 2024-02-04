import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PostModule } from './announcement/announcement.module';
// import { TagModule } from './tag/tag.module';
import { PrismaModule } from './prisma/prisma.module';
import { MinioClientModule } from './minio-client/minio-client.module';

@Module({
  imports: [
      // PostModule,
      // TagModule,
      PrismaModule,
      MinioClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
