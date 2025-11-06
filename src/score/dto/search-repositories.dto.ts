import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SearchRepositoriesDto {
  @ApiProperty({
    description:
      'The search query. You can search by repository name, description, topics, etc.',
    example: 'nestjs',
  })
  q: string;

  @ApiPropertyOptional({
    description: 'Number of results (max 100)',
    minimum: 1,
    maximum: 100,
    example: 10,
  })
  per_page?: number;

  @ApiPropertyOptional({
    description: 'Page number',
    minimum: 1,
    example: 1,
  })
  page?: number;

  @ApiPropertyOptional({
    description:
      'Filter by programming language (e.g., typescript, javascript, python, go)',
    example: 'typescript',
  })
  language?: string;

  @ApiPropertyOptional({
    description:
      'Filter by earliest created date in (YYYY-MM-DD) format. Only repositories created on or after this date will be returned.',
    example: '2020-01-01',
  })
  created_after?: string;
}
