import { Controller, Get, Param } from '@nestjs/common';

import { HurmaService } from './hurma.service';
import {
  BandapixelsVacanciesResponse,
  BandapixelsVacancyResponse,
} from './models/bandapixelsVacancy.model';

@Controller('hurma')
export class HurmaController {
  constructor(private hurmaService: HurmaService) {}

  @Get('/vacancies')
  private async getVacanciesList(): Promise<BandapixelsVacanciesResponse> {
    return this.hurmaService.getVacanciesList();
  }

  @Get('/vacancies/:id')
  private async getVacancy(
    @Param('id') id: string,
  ): Promise<BandapixelsVacancyResponse> {
    return this.hurmaService.getVacancy(+id);
  }
}
