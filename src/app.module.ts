import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScoreModule } from './score/score.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    ScoreModule.forRoot(),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
