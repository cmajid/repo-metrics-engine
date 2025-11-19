import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LibsModule } from 'src/libs/libs.module';
import { ProviderService } from './provider.service';
import { REPO_PROVIDER_SERVICE } from '../contracts/repo-provider-service';

@Module({
  imports: [HttpModule, LibsModule],
  providers: [
    {
      provide: REPO_PROVIDER_SERVICE,
      useClass: ProviderService,
    },
  ],
  exports: [REPO_PROVIDER_SERVICE],
})
export class GithubModule {}
