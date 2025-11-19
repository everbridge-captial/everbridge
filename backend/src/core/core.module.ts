import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { VerificationModule } from './verification/verification.module';
import { NotificationModule } from './notification/notification.module';
import { UploaderModule } from './uploader/uploader.module';

@Module({
  imports: [AuthModule, VerificationModule, NotificationModule, UploaderModule],
  exports: [AuthModule],
})
export class CoreModule {}
