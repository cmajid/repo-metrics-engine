
class DependencyStatus {
    status: string;
    url: string;
}

class Dependencies {
    githubApi: DependencyStatus;
}

export class HealthResponseDto {
    status: string;
    timestamp: string;
    uptime: number;
    service: string;
    version: string;
    dependencies: Dependencies;
}
