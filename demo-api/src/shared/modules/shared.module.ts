import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiConfigService } from '@shared/services/api-config.service';

@Global()
@Module({
  providers: [ApiConfigService],
  imports: [HttpModule],
  exports: [ApiConfigService, HttpModule],
})
export class SharedModule {}
