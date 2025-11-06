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
    const params = new URLSearchParams();
    const query = this.buildSearchQuery(searchDto);
    this.buildQuery(params, query, searchDto);
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
            html_url: item.owner.html_url,
            type: item.owner.type,
          },
          html_url: item.html_url,
          description: item.description,
          stargazers_count: item.stargazers_count,
          watchers_count: item.watchers_count,
          forks_count: item.forks_count,
          language: item.language,
          created_at: item.created_at,
          updated_at: item.updated_at,

          popularity_score: 0,
        } as RepositoryDto;
      },
    );
    return {
      total_count: response.data.total_count,
      incomplete_results: response.data.incomplete_results,
      items: transformedItems,
    };
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
