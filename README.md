
## Description
This API uses the GitHub REST API and adds a smart scoring system to rate repositories by different factors. It offers an easy and clear way to find popular and well-maintained repositories.

### Key Features

**Advanced Search**: Search GitHub repositories with multiple filters
**Popularity Scoring**: Intelligent scoring algorithm (0-100) based on stars, forks, and recency
**Flexible Filtering**: Filter by language, creation date, and more
**Pagination Support**: Efficient handling of large result sets
**Interactive Documentation**: Swagger/OpenAPI documentation included
**Type-Safe**: Built with TypeScript for reliability

### Accessing the API

- **Swagger Documentation**: `http://localhost:3000/api`

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


### Available Parameters

| Parameter | Type |  Description |
|-----------|------|----------|
| `q` | string | Search query |
| `sort` | string | Sort by: `stars`, `forks`, `updated` |
| `per_page` | number | Results per page (1-100) |
| `page` | number | Page number |
| `language` | string | Filter by language (e.g., `typescript`) |
| `created_after` | string | Filter by creation date (YYYY-MM-DD) |


### Example Response

```json
{
  "total_count": 139602,
  "incomplete_results": false,
  "items": [
    {
      "id": 80945428,
      "name": "nest",
      "full_name": "nestjs/nest",
      "popularity_score": 94.35,
      "stargazers_count": 73362,
      "forks_count": 8083,
      "language": "TypeScript",
      ...
    }
  ]
}
```


# Popularity Score

A simple 0-100 score based on:

- **Stars** (max 70 pts): 1 point per 100 stars
- **Forks** (max 20 pts): 1 point per 50 forks  
- **Recent activity** (10 pts): +10 if updated in last 30 days

**Example:** A repo with 10,000 stars, 2,000 forks, updated 10 days ago = 100 + 40 + 10 = **90 points** (capped at 100)

## What's next?
- Add support for other provider platforms (GitLab, Bitbucket, etc.)

## License

Nest and Repo Metrics Engine are [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
