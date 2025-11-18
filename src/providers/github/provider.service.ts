import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  RepositoryDto,
} from 'src/score/dto/repository-response.dto';
import { SearchRepositoriesDto } from 'src/score/dto/search-repositories.dto';
import {
  GithubRepoItemDto,
  GithubRepoSearchResponseDto,
} from './dto/github-repsonse.dto';
import { ResponseDto } from 'src/score/dto/reponse.dto';
import { ScoreCalculator } from 'src/libs/score-calculator';
import RepoProviderService from '../contracts/repo-provider-service';

@Injectable()
export class ProviderService implements RepoProviderService {
  private readonly GITHUB_API_URL = 'https://api.github.com';
  constructor(
    private readonly httpService: HttpService,
    private readonly scoreCalculator: ScoreCalculator
  ) { }

  async searchRepositoriesWithScores(
    searchDto: SearchRepositoriesDto,
  ): Promise<ResponseDto<RepositoryDto[]>> {
    
    const query = this.buildSearchQuery(searchDto);
    const params = new URLSearchParams();
    this.buildQuery(params, query, searchDto);
    try {
      const { response, transformedItems } = await this.inqueryGithub(params);
      return {
        total_count: response.data.total_count,
        items: transformedItems,
        success: true,
      };
    } catch (error) {
      return {
        total_count: 0,
        items: [],
        success: false,
        error: error?.response?.data?.message,
      };
    }

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

          popularity_score: this.scoreCalculator.calculatePopularityScore(
            item.stargazers_count,
            item.forks_count,
            item.updated_at
          ),
        } as RepositoryDto;
      },
    );
    return { response, transformedItems };
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




/*

1. abstract factory 
2. implemet an interface
3. all provider services should extentd the interface



   a. interface scoreRepostiry
      {
        searchRepositoriesWithScores(searchDto: SearchRepositoriesDto): Promise<ResponseDto<RepositoryDto[]>>();
      }


*/