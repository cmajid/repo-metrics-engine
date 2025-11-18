import { ResponseDto } from "src/score/dto/reponse.dto";
import { RepositoryDto } from "src/score/dto/repository-response.dto";
import { SearchRepositoriesDto } from "src/score/dto/search-repositories.dto";

export const REPO_PROVIDER_SERVICE = Symbol('REPO_PROVIDER_SERVICE');

export default interface RepoProviderService{
    searchRepositoriesWithScores(
       searchDto: SearchRepositoriesDto,
    ): Promise<ResponseDto<RepositoryDto[]>>;
}