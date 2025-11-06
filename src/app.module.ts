import { Module } from '@nestjs/common';
import { GithubModule } from './providers/github/github.module';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [GithubModule, ScoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
