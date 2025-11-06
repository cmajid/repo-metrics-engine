export class GithubOwnerDto {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
}

export class GithubRepoItemDto {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: GithubOwnerDto;
  private: boolean;
  html_url: string;
  description?: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language?: string;
}
export class GithubRepoSearchResponseDto {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepoItemDto[];
}
