import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './announcement/announcement.module';
import { TagModule } from './tag/tag.module';
import { PrismaModule } from './prisma/prisma.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { MinioClientModule } from './minio-client/minio-client.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
      PostModule,
      TagModule,
      PrismaModule,
      MinioClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
