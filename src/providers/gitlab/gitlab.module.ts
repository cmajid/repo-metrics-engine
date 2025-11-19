import { Module } from '@nestjs/common';
import { GitlabService } from './provider.service';
import { REPO_PROVIDER_SERVICE } from '../contracts/repo-provider-service';

@Module({
  providers: [
    {
      provide: REPO_PROVIDER_SERVICE,
      useClass: GitlabService,
    },
  ],
  exports: [REPO_PROVIDER_SERVICE],
})
export class GitlabModule {}
