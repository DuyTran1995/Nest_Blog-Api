import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');

  const logger = new Logger('bootstrap');

  const configService = app.get(ConfigService);

  const port = configService.get('PORT');

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
