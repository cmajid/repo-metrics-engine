export class RepositoryOwnerDto {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    type: string;
}

export class RepositoryDto {
    id: number;
    name: string;
    full_name: string;
    owner: RepositoryOwnerDto;
    html_url: string;
    description: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    language: string;
    created_at: string;
    updated_at: string;
    popularity_score?: number;
}

export class SearchRepositoriesResponseDto {
    total_count: number;
    incomplete_results: boolean;
    items: RepositoryDto[];
}
