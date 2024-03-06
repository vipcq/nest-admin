import { readFileSync } from "fs";
import * as yaml from 'js-yaml';
import { join } from "path";

import * as _ from 'lodash';

const YAML_COMMON_CONFIG_FILENAME = 'config.yml';
const filePath = join(__dirname, '../config', YAML_COMMON_CONFIG_FILENAME);

const envPath = join(__dirname, '../config', `config.${process.env.NODE_ENV || 'development'}.yml`)

const commonConfig =  yaml.load(readFileSync(filePath, 'utf-8'));
const envConfig = yaml.load(readFileSync(envPath, 'utf-8'));



/* export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    }
  }); */
 export default () => {
    return _.merge(commonConfig, envConfig)
} 
