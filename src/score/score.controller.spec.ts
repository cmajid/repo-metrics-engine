import { Test, TestingModule } from '@nestjs/testing';
import { ScoreController } from './score.controller';
import { SearchRepositoriesDto } from './dto/search-repositories.dto';
import { ResponseDto } from './dto/reponse.dto';
import { RepositoryDto } from './dto/repository-response.dto';
import { REPO_PROVIDER_SERVICE } from 'src/providers/contracts/repo-provider-service';
import type RepoProviderService from 'src/providers/contracts/repo-provider-service';

describe('ScoreController', () => {
  let scoreController: ScoreController;
  let repoProviderService: RepoProviderService;

  beforeEach(async () => {
    const mockRepoProviderService: RepoProviderService = {
      searchRepositoriesWithScores: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoreController],
      providers: [
        {
          provide: REPO_PROVIDER_SERVICE,
          useValue: mockRepoProviderService,
        },
      ],
    }).compile();

    scoreController = module.get<ScoreController>(ScoreController);
    repoProviderService = module.get<RepoProviderService>(REPO_PROVIDER_SERVICE);
  });

  describe('searchRepositoriesWithScores', () => {
    it('should return a response with repositories', async () => {
      const searchDto: SearchRepositoriesDto = { q: 'test-query' };
      const result: ResponseDto<RepositoryDto[]> = { total_count: 0, items: [], success: true };

      jest.spyOn(repoProviderService, 'searchRepositoriesWithScores').mockResolvedValue(result);

      expect(await scoreController.searchRepositoriesWithScores(searchDto)).toBe(result);
      expect(repoProviderService.searchRepositoriesWithScores).toHaveBeenCalledWith(searchDto);
    });
  });
});
