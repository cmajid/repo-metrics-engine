import { Module } from '@nestjs/common';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [ScoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
