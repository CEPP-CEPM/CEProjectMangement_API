import { Module } from '@nestjs/common';
import { AssignmentSubmitService } from './assignment-submit.service';
import { AssignmentSubmitController } from './assignment-submit.controller';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [MinioClientModule, PrismaModule],
  controllers: [AssignmentSubmitController],
  providers: [AssignmentSubmitService],
})
export class AssignmentSubmitModule {}
