import { Injectable } from '@nestjs/common';
import RepoProviderService from '../contracts/repo-provider-service';
import { ResponseDto } from 'src/score/dto/reponse.dto';
import { RepositoryDto } from 'src/score/dto/repository-response.dto';
import { SearchRepositoriesDto } from 'src/score/dto/search-repositories.dto';

@Injectable()
export class GitlabService implements RepoProviderService {
  async searchRepositoriesWithScores(
    searchDto: SearchRepositoriesDto,
  ): Promise<ResponseDto<RepositoryDto[]>> {

    return {
      total_count: 0,
      items: [],
      success: false,
      error: 'GitLab provider not implemented yet',
    };
  }
}
