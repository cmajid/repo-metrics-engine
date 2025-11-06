import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { GithubModule } from 'src/providers/github/github.module';

@Module({
  imports: [GithubModule],
  controllers: [ScoreController],
})
export class ScoreModule {}
