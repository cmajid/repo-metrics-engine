import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  swaggerConfig(app);
  await app.listen(process.env.PORT ?? 3000);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();

const swaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('GitHub Repository Search API')
    .setDescription(
      'API for searching and scoring GitHub repositories using the GitHub REST API.',
    )
    .setVersion('1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'GitHub Search API Docs',
    swaggerOptions: {
      showRequestDuration: true,
    },
  });
};
