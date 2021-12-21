import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  BandapixelsVacanciesResponse,
  BandapixelsVacancyResponse,
} from './models/bandapixelsVacancy.model';

@Injectable()
export class HurmaService {
  constructor(private httpService: HttpService) {}

  async getVacanciesList(): Promise<BandapixelsVacanciesResponse> {
    return (
      await this.httpService
        .get<BandapixelsVacanciesResponse>('/vacancies')
        .toPromise()
    ).data;
  }

  async getVacancy(id: number): Promise<BandapixelsVacancyResponse> {
    return (
      await this.httpService
        .get<BandapixelsVacancyResponse>(`/vacancies/${id}`)
        .toPromise()
    ).data;
  }
}
