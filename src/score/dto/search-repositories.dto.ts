
export class SearchRepositoriesDto {
  q: string;
  per_page?: number;
  page?: number;
  language?: string;
  created_after?: string;
}
