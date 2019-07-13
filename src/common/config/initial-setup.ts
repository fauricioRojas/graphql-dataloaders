import * as dotenv from 'dotenv';
import { createTypeORMConnection } from '../../datasources/typeorm';

dotenv.config();
createTypeORMConnection();
