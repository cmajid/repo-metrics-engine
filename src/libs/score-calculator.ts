import { Injectable } from '@nestjs/common';

@Injectable()
export class ScoreCalculator {
    calculatePopularityScore(stars: number, forks: number, updated_at: string): number {
        // Stars: max 70 points (divide by 100, maximum at 70)
        const starPoints = Math.min(stars / 100, 70);

        // Forks: max 20 points (divide by 50, maximum at 20)
        const forkPoints = Math.min(forks / 50, 20);

        // Calculate days since last update
        const daysSinceUpdate = Math.floor(
            (Date.now() - new Date(updated_at).getTime()) /
            (1000 * 60 * 60 * 24),
        );

        // Recent activity: +10 points if updated in last 30 days
        const recentBonus = daysSinceUpdate < 30 ? 10 : 0;

        // Total score: max 100 points
        return Math.round(starPoints + forkPoints + recentBonus);
    }

}