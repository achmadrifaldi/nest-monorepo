import { Module } from '@nestjs/common';
import { UserModule } from '@app/main';
import { UserServicesController } from './user-services.controller';

@Module({
  imports: [UserModule],
  controllers: [UserServicesController],
})
export class UserServicesModule {}
