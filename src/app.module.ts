import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TagModule } from './tag/tag.module';
import { PrismaModule } from './prisma/prisma.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { AnnouncementModule } from './announcement/announcement.module';
import { AssignmentModule } from './assignment/assignment.module';
import { GroupService } from './group/group.service';
import { GroupController } from './group/group.controller';
import { GroupModule } from './group/group.module';
import { UserGroupModule } from './user-group/user-group.module';
import { UserGroupService } from './user-group/user-group.service';
import { UserGroupController } from './user-group/user-group.controller';
import { UsersModule } from './users/users.module';
import { AssignmentSubmitModule } from './assignment-submit/assignment-submit.module';
import { CsvController } from './csv/csv.controller';
import { CsvService } from './csv/csv.service';
import { CsvModule } from './csv/csv.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
      // TagModule,
      AnnouncementModule,
      PrismaModule,
      MinioClientModule,
      FileUploadModule,
      AuthModule,
      AssignmentModule,
      GroupModule,
      UserGroupModule,
      UsersModule,
      AssignmentSubmitModule,
      CsvModule,
  ],
  controllers: [AppController, GroupController, UserGroupController, CsvController],
  providers: [AppService, GroupService, UserGroupService, CsvService],
})
export class AppModule {}
