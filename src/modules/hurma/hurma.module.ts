import { Module } from '@nestjs/common';
import { HurmaController } from './hurma.controller';
import { HttpModule } from '@nestjs/axios';
import { HurmaService } from './hurma.service';
import { AppConfigService } from '../config/app.config.service';

@Module({
  controllers: [HurmaController],
  imports: [
    HttpModule.registerAsync({
      inject: [AppConfigService],
      extraProviders: [AppConfigService],
      useFactory: async (configService: AppConfigService) => ({
        baseURL: configService.get('HURMA_BANDAPIXELS_BASE_URL'),
      }),
    }),
  ],
  providers: [HurmaService],
})
export class HurmaModule {}
