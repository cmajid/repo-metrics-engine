import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from 'src/providers/github/github.service';
import { SearchRepositoriesResponseDto } from './dto/repository-response.dto';
import { SearchRepositoriesDto } from './dto/search-repositories.dto';

@Controller({
    path: 'score',
    version: '1',
})
export class ScoreController {

    constructor(private readonly githubService: GithubService) { }

    @Get('search/repositories/scored')
    async searchRepositoriesWithScores(
        @Query() searchDto: SearchRepositoriesDto,
    ): Promise<SearchRepositoriesResponseDto> {
        return this.githubService.searchRepositoriesWithScores(searchDto);
    }

}
