import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HealthResponseDto } from './dto/health.response.dto';
import { ResponseDto } from 'src/score/dto/reponse.dto';

@Injectable()
export class HealthService {
    private readonly GITHUB_API_URL = 'https://api.github.com';
    constructor(private readonly httpService: HttpService) { }

    async getHealthDetails(): Promise<ResponseDto<HealthResponseDto>> {
        const githubApiHealthy = await this.checkGitHubApiHealth();
        const result = {
            status: githubApiHealthy ? 'ok' : 'degraded',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            service: 'repo-metrics-engine',
            version: '1.0.0',
            dependencies: {
                githubApi: {
                    status: githubApiHealthy ? 'up' : 'down',
                    url: this.GITHUB_API_URL,
                },
            },
        } as HealthResponseDto;

        return {
            total_count: 1,
            items: result,
            success: githubApiHealthy,
        };
    }

    async checkGitHubApiHealth(): Promise<boolean> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.GITHUB_API_URL}/zen`, {
                    timeout: 5000,
                }),
            );
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }
}
