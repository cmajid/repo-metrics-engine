import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScoreController } from './score.controller';
import { GithubModule } from 'src/providers/github/github.module';
import { GitlabModule } from 'src/providers/gitlab/gitlab.module';

export const PROVIDER_MODULES = {
  gitlab: GitlabModule,
  github: GithubModule,
  // Adding new providers here doesn't require changing ScoreModule
};

@Module({})
export class ScoreModule {
  static forRoot(): DynamicModule {
    const selectedProvider = process.env.SELECTED_PROVIDER?.toLowerCase() || 'github';
    const providerModule = PROVIDER_MODULES[selectedProvider];

    if (!providerModule) {
      throw new Error(`Unknown provider: ${selectedProvider}`);
    }

    return {
      module: ScoreModule,
      imports: [providerModule],
      controllers: [ScoreController],
    };
  }
}
