/**
 * Import models module to auto load entity when service start
 */

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  exports: [UserModule],
})
export class ModelsModule {}
