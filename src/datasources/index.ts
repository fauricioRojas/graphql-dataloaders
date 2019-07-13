import { ITypeORMDatasource, getTypeORMDatasource } from './typeorm';

export interface IDatasources {
  typeORM: ITypeORMDatasource;
}

export const getDatasources = (): IDatasources => ({
  typeORM: getTypeORMDatasource()
});
