import { Controller, Get, Param } from '@nestjs/common';

import { HurmaService } from './hurma.service';

@Controller('hurma')
export class HurmaController {
  constructor(private hurmaService: HurmaService) {}

  @Get('/vacancies')
  public async getVacanciesList() {
    return (await this.hurmaService.getVacanciesList()).result.data.map(
      (vacancy) => {
        return {
          id: vacancy.id,
          title: vacancy.name,
          description: vacancy.description,
          reqSkills: vacancy.demand
            .split('\r\n')
            .map((str) => str.replace(/^- /, ''))
            .join('\r\n'),
          plus: vacancy.addition
            .split('\r\n')
            .map((str) => str.replace(/^- /, ''))
            .join('\r\n'),
          responsibility: vacancy.responsibility,
        };
      },
    );
  }

  @Get('/vacancies/:id')
  public async getVacancy(@Param('id') vacancyId: string) {
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
