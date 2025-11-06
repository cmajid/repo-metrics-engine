import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from 'src/providers/github/github.service';
import { RepositoryDto } from './dto/repository-response.dto';
import { SearchRepositoriesDto } from './dto/search-repositories.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseDto } from './dto/reponse.dto';

@Controller({
  path: 'score',
  version: '1',
})
export class ScoreController {
  constructor(private readonly githubService: GithubService) { }

  @ApiOperation({
    summary: 'Search GitHub repositories with popularity scores',
  })
  @Get('repositories')
  async searchRepositoriesWithScores(
    @Query() searchDto: SearchRepositoriesDto,
  ): Promise<ResponseDto<RepositoryDto[]>> {
    return this.githubService.searchRepositoriesWithScores(searchDto);
  }
}
