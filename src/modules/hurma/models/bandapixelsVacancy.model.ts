export interface Vacancy {
  id: string;
  status_id: string;
  on_site_id: string;
  name: string;
  description: string;
  demand: string;
  addition: string;
  responsibility: string;
  working_conditions: string;
  open_date: string;
  close_date: string;
  hot_flag: string;
  created_at: string;
  updated_at: string;
  company_name: string;
  published: string;
  residence: string;
  number_of_positions: string;
  work_types: string[];
  salary: {
    from: number;
    to: number;
    currency: string;
  };
  experience: string;
}

export interface VacanciesList {
  current_page: number;
  data: Vacancy[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface BandapixelsVacanciesResponse {
  result: VacanciesList;
  error: boolean;
  code: number;
  messages: string[];
}

export interface BandapixelsVacancyResponse {
  result: Vacancy;
  error: boolean;
  code: number;
  messages: string[];
}
