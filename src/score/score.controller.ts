import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from 'src/providers/github/github.service';
import { SearchRepositoriesResponseDto } from './dto/repository-response.dto';
import { SearchRepositoriesDto } from './dto/search-repositories.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller({
  path: 'score',
  version: '1',
})
export class ScoreController {
  constructor(private readonly githubService: GithubService) {}

  @ApiOperation({
    summary: 'Search GitHub repositories with popularity scores',
  })
  @Get('repositories')
  async searchRepositoriesWithScores(
    @Query() searchDto: SearchRepositoriesDto,
  ): Promise<SearchRepositoriesResponseDto> {
    return this.githubService.searchRepositoriesWithScores(searchDto);
  }
}
