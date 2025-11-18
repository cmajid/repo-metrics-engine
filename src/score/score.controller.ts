import { Controller, Get, Query, Inject } from '@nestjs/common';
import { RepositoryDto } from './dto/repository-response.dto';
import { SearchRepositoriesDto } from './dto/search-repositories.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseDto } from './dto/reponse.dto';
import { REPO_PROVIDER_SERVICE } from 'src/providers/contracts/repo-provider-service';
import type RepoProviderService from 'src/providers/contracts/repo-provider-service';

@Controller({
  path: 'score',
  version: '1',
})
export class ScoreController {
  constructor(
    @Inject(REPO_PROVIDER_SERVICE)
    private readonly repoProviderService: RepoProviderService,
  ) {}

  @ApiOperation({
    summary: 'Search repositories with popularity scores',
  })
  @Get('repositories')
  async searchRepositoriesWithScores(
    @Query() searchDto: SearchRepositoriesDto,
  ): Promise<ResponseDto<RepositoryDto[]>> {
    return this.repoProviderService.searchRepositoriesWithScores(searchDto);
  }
}
