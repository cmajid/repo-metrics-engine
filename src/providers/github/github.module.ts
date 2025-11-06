import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { HttpModule } from '@nestjs/axios';
import { LibsModule } from 'src/libs/libs.module';

@Module({
  imports: [HttpModule, LibsModule],
  providers: [GithubService],
  exports: [GithubService],
})
export class GithubModule {}
