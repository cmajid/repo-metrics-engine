import { Injectable } from '@nestjs/common';
import { SearchRepositoriesDto } from 'src/score/dto/search-repositories.dto';

@Injectable()
export class GithubService {
    searchRepositoriesWithScores(searchDto: SearchRepositoriesDto): any {
        throw new Error('Method not implemented.');
    }
}
