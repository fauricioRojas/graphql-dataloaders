import { createConnection, getConnection, Connection } from 'typeorm';
import { entities, ITypeORMEntities } from './entities';

export interface ITypeORMDatasource {
  connection: Connection;
  entities: ITypeORMEntities;
}

export const createTypeORMConnection = () => {
  return createConnection({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: Object.keys(entities).map((key) => entities[key]),
    synchronize: true,
    logging: true
  });
};

export const getTypeORMDatasource = (): ITypeORMDatasource => ({
  connection: getConnection(),
  entities
});
