import { Module } from '@nestjs/common';
import { UserServicesModule } from './user-services/user-services.module';

@Module({
  imports: [UserServicesModule],
})
export class ServicesModule {}
