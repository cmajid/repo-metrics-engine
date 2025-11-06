export class RepositoryOwnerDto {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  type: string;
}

export class RepositoryDto {
  id: number;
  name: string;
  full_name: string;
  owner: RepositoryOwnerDto;
  url: string;
  description: string;
  stars_count: number;
  watchers_count: number;
  forks_count: number;
  language: string;
  created_at: string;
  updated_at: string;
  popularity_score?: number;
}
