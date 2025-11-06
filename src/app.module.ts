import { Module } from '@nestjs/common';
import { ScoreModule } from './score/score.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ScoreModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
