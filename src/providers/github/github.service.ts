import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  RepositoryDto,
  SearchRepositoriesResponseDto,
} from 'src/score/dto/repository-response.dto';
import { SearchRepositoriesDto } from 'src/score/dto/search-repositories.dto';
import {
  GithubRepoItemDto,
  GithubRepoSearchResponseDto,
} from './dto/github-repsonse.dto';

@Injectable()
export class GithubService {
  private readonly GITHUB_API_URL = 'https://api.github.com';
  constructor(private readonly httpService: HttpService) {}

  async searchRepositoriesWithScores(
    searchDto: SearchRepositoriesDto,
  ): Promise<SearchRepositoriesResponseDto> {
    const query = this.buildSearchQuery(searchDto);
    const params = new URLSearchParams();
    this.buildQuery(params, query, searchDto);
    const { response, transformedItems } = await this.inqueryGithub(params);
    return {
      total_count: response.data.total_count,
      items: transformedItems,
    };
  }

  private async inqueryGithub(params: URLSearchParams) {
    const url = `${this.GITHUB_API_URL}/search/repositories?${params.toString()}`;

    const response = await firstValueFrom(
      this.httpService.get<GithubRepoSearchResponseDto>(url, {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }),
    );

    // Transform response to only include essential fields
    const transformedItems = response.data.items.map(
      (item: GithubRepoItemDto) => {
        return {
          id: item.id,
          name: item.name,
          full_name: item.full_name,
          owner: {
            login: item.owner.login,
            id: item.owner.id,
            avatar_url: item.owner.avatar_url,
            url: item.owner.html_url,
            type: item.owner.type,
          },
          url: item.html_url,
          description: item.description,
          stars_count: item.stargazers_count,
          watchers_count: item.watchers_count,
          forks_count: item.forks_count,
          language: item.language,
          created_at: item.created_at,
          updated_at: item.updated_at,

          popularity_score: this.calculatePopularityScore(item),
        } as RepositoryDto;
      },
    );
    return { response, transformedItems };
  }

  calculatePopularityScore(repository: GithubRepoItemDto): number {
    // Stars: max 70 points (divide by 100, maximum at 70)
    const starPoints = Math.min(repository.stargazers_count / 100, 70);

    // Forks: max 20 points (divide by 50, maximum at 20)
    const forkPoints = Math.min(repository.forks_count / 50, 20);

    // Calculate days since last update
    const daysSinceUpdate = Math.floor(
      (Date.now() - new Date(repository.updated_at).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    // Recent activity: +10 points if updated in last 30 days
    const recentBonus = daysSinceUpdate < 30 ? 10 : 0;

    // Total score: max 100 points
    return Math.round(starPoints + forkPoints + recentBonus);
  }

  private buildQuery(
    params: URLSearchParams,
    query: string,
    searchDto: SearchRepositoriesDto,
  ) {
    params.append('q', query);
    if (searchDto.sort) params.append('sort', searchDto.sort);
    if (searchDto.per_page)
      params.append('per_page', searchDto.per_page.toString());
    if (searchDto.page) params.append('page', searchDto.page.toString());
    params.append('order', 'desc');
  }

  private buildSearchQuery(searchDto: SearchRepositoriesDto): string {
    let query = searchDto.q;

    // Add language filter
    if (searchDto.language) {
      query += ` language:${searchDto.language}`;
    }

    // Add created date filter
    if (searchDto.created_after) {
      query += ` created:>=${searchDto.created_after}`;
    }

    return query;
  }
}
