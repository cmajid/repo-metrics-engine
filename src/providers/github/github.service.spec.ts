import { Test, TestingModule } from '@nestjs/testing';
import { GithubService } from './github.service';
import { HttpService } from '@nestjs/axios';
import { SearchRepositoriesDto } from 'src/score/dto/search-repositories.dto';
import { AxiosError, AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import { GithubRepoItemDto } from './dto/github-repsonse.dto';
import { ScoreCalculator } from 'src/libs/score-calculator';

describe('GithubService', () => {
    let service: GithubService;
    let httpService: HttpService;

    const mockRepository = {
        id: 80945428,
        name: 'nest',
        full_name: 'nestjs/nest',
        owner: {
            login: 'nestjs',
            id: 28507035,
            avatar_url: 'https://avatars.githubusercontent.com/u/28507035?v=4',
            html_url: 'https://github.com/nestjs',
            type: 'Organization',
        },
        html_url: 'https://github.com/nestjs/nest',
        description: 'A progressive Node.js framework',
        stargazers_count: 73362,
        watchers_count: 73362,
        forks_count: 8083,
        language: 'TypeScript',
        created_at: '2017-02-04T20:12:52Z',
        updated_at: '2025-11-06T12:33:35Z',
    } as GithubRepoItemDto;

    const mockGithubApiResponse = {
        total_count: 1,
        items: [mockRepository],
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GithubService,
                {
                    provide: HttpService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
                {
                    provide: ScoreCalculator,
                    useValue: {
                        calculatePopularityScore: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<GithubService>(GithubService);
        httpService = module.get<HttpService>(HttpService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('searchRepositories', () => {
        it('should search repositories', async () => {

            // Arrange
            const searchDto: SearchRepositoriesDto = {
                q: 'nestjs',
            };
            const axiosResponse: AxiosResponse = {
                data: mockGithubApiResponse,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {} as any,
            };
            jest.spyOn(httpService, 'get').mockReturnValue(of(axiosResponse));

            // Act
            const result = await service.searchRepositoriesWithScores(searchDto);

            // Assert
            expect(result.success).toBe(true);
            expect(result.total_count).toBe(1);
            expect(result.items).toHaveLength(1);
            expect(result.items[0].name).toBe('nest');
            expect(httpService.get).toHaveBeenCalled();
        });
    });

    it('should search repositories with pagination parameters', async () => {

        // Arrange
        const searchDto: SearchRepositoriesDto = {
            q: 'nestjs',
            per_page: 10,
            page: 2,
        };
        const axiosResponse: AxiosResponse = {
            data: mockGithubApiResponse,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as any,
        };
        jest.spyOn(httpService, 'get').mockReturnValue(of(axiosResponse));

        // Act
        await service.searchRepositoriesWithScores(searchDto);

        // Assert
        expect(httpService.get).toHaveBeenCalledWith(
            expect.stringContaining('per_page=10'),
            expect.any(Object),
        );
        expect(httpService.get).toHaveBeenCalledWith(
            expect.stringContaining('page=2'),
            expect.any(Object),
        );
    });

    it('should handle GitHub API errors with response', async () => {

        // Arrange
        const searchDto: SearchRepositoriesDto = {
            q: 'nestjs',
        };

        const axiosError = {
            response: {
                data: { message: 'API rate limit exceeded' },
                status: 403,
            },
        } as AxiosError;

        jest
            .spyOn(httpService, 'get')
            .mockReturnValue(throwError(() => axiosError));


        // Act
        const result = await service.searchRepositoriesWithScores(searchDto);

        // Assert
        expect(result.success).toBe(false);
        expect(result.error).toBe('API rate limit exceeded');
        expect(result.total_count).toBe(0);
    });
});
