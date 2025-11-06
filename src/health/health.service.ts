import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HealthService {
    private readonly GITHUB_API_URL = 'https://api.github.com';
    constructor(private readonly httpService: HttpService) { }

    async getHealthDetails() {
        const githubApiHealthy = await this.checkGitHubApiHealth();

        return {
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
