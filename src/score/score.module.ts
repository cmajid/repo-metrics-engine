import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScoreController } from './score.controller';
import { GithubModule } from 'src/providers/github/github.module';
import { GitlabModule } from 'src/providers/gitlab/gitlab.module';

@Module({})
export class ScoreModule {
  static forRoot(): DynamicModule {
    const selectedProvider = process.env.SELECTED_PROVIDER?.toLowerCase();
    const providerModule =
      selectedProvider === 'gitlab' ? GitlabModule : GithubModule;

    return {
      module: ScoreModule,
      imports: [providerModule],
      controllers: [ScoreController],
    };
  }
}
