import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger } from 'winston';
import * as winston from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule, utilities } from 'nest-winston';
import 'winston-daily-rotate-file';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AllExceptionFilter } from './filters/all-exception.filter';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule, {

  });
  app.setGlobalPrefix('api/v1');
  const httpAdapter = app.get(HttpAdapterHost);
  //app.useGlobalFilters(new HttpExceptionFilter(logger));
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER)
 app.useLogger(logger);
 app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));
  await app.listen(3000);
}
bootstrap();
