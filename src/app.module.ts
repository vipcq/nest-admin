import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';

//import Configuration from './configuration';

const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env'})],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
        .valid('development', 'production')
        .default('development'),
        DB_PORT: Joi.number().default(3306),
        DB_HOST: Joi.string().ip()
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
