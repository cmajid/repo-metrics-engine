import { ScoreCalculator } from './score-calculator';

describe('ScoreCalculator', () => {
    let calculator: ScoreCalculator;

    beforeEach(() => {
        calculator = new ScoreCalculator();
    });

    describe('calculatePopularityScore', () => {
        it('should calculate score with stars, forks, and recent update', () => {
            const score = calculator.calculatePopularityScore(
                5000,
                500,
                new Date().toISOString()
            );

            // Expected: 50 (stars) + 10 (forks) + 10 (recent) = 70
            expect(score).toBe(70);
        });

        it('should cap at maximum score of 100', () => {
            const score = calculator.calculatePopularityScore(
                10000,
                2000,
                new Date().toISOString()
            );

            expect(score).toBe(100);
        });

        it('should not add recent bonus for old updates', () => {
            const score = calculator.calculatePopularityScore(
                5000,
                500,
                '2020-01-01T00:00:00Z'
            );

            // Expected: 50 (stars) + 10 (forks) + 0 (not recent) = 60
            expect(score).toBe(60);
        });

        it('should handle zero values', () => {
            const score = calculator.calculatePopularityScore(
                0,
                0,
                '2020-01-01T00:00:00Z'
            );

            expect(score).toBe(0);
        });
    });
});

