import { Test, TestingModule } from '@nestjs/testing';
import { ScoreController } from './score.controller';
import { GithubService } from 'src/providers/github/provider.service';
import { SearchRepositoriesDto } from './dto/search-repositories.dto';
import { ResponseDto } from './dto/reponse.dto';
import { RepositoryDto } from './dto/repository-response.dto'; // Importing RepositoryDto
import { HttpModule, HttpService } from '@nestjs/axios';
import { ScoreCalculator } from '../libs/score-calculator'; // Correct import for ScoreCalculator

describe('ScoreController', () => {
  let scoreController: ScoreController;
  let githubService: GithubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoreController],
      providers: [
        {
          provide: GithubService,
          useFactory: (httpService, scoreCalculator) => new GithubService(httpService, scoreCalculator),
          inject: [HttpService, ScoreCalculator],
        },
        {
          provide: ScoreCalculator,
          useFactory: () => new ScoreCalculator(),
          inject: [],
        },
      ],
      imports: [HttpModule], 
    }).compile();

    scoreController = module.get<ScoreController>(ScoreController);
    githubService = module.get<GithubService>(GithubService);
  });

  describe('searchRepositoriesWithScores', () => {
    it('should return a response with repositories', async () => {
      const searchDto: SearchRepositoriesDto = { q: 'test-query' }; // mock search parameters
      const result: ResponseDto<RepositoryDto[]> = { total_count: 0, items: [], success: true }; // mock response data

      jest.spyOn(githubService, 'searchRepositoriesWithScores').mockResolvedValue(result);

      expect(await scoreController.searchRepositoriesWithScores(searchDto)).toBe(result);
      expect(githubService.searchRepositoriesWithScores).toHaveBeenCalledWith(searchDto);
    });
  });
});
