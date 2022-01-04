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
  private async getVacanciesList() {
    return (await this.hurmaService.getVacanciesList()).result.data.map(
      (vacancy) => {
        return {
          id: vacancy.id,
          title: vacancy.name,
          description: vacancy.description,
          reqSkills: vacancy.demand,
          plus: vacancy.addition,
          responsibility: vacancy.responsibility,
        };
      },
    );
  }

  @Get('/vacancies/:id')
  private async getVacancy(@Param('id') vacancyId: string) {
    const {
      id,
      name: title,
      description,
      demand: reqSkills,
      addition: plus,
      responsibility,
    } = (await this.hurmaService.getVacancy(+vacancyId)).result;

    return {
      id,
      description,
      title,
      reqSkills,
      plus,
      responsibility,
    };
  }
}
