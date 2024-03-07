import { Global, Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { Profile } from './user/profile.entity';
import { Logs } from './logs/logs.entity';
import { Roles } from './roles/roles.entity';
import { LogsModule } from './logs/logs.module';



//import Configuration from './configuration';

const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

@Global()
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
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'dzwy0818',
      database: 'testdb',
      entities: [User, Profile, Logs, Roles],
      synchronize: true,
    }),
    UserModule,
    LogsModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, Logger],
  exports: [Logger]
})
export class AppModule {}
