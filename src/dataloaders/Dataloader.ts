import { IDataloaders } from './dataloader.interface';
import { In, FindManyOptions, ObjectType } from 'typeorm';
import { IDatasources } from '../datasources/index';
import { Country } from '../datasources/typeorm/entities/country.model';
import * as DataloaderLibrary from 'dataloader';

export default class Dataloader {
  constructor(private datasources: IDatasources) {}

  public generateDataloaders = (): IDataloaders => {
    const {
      Country: CountryEntity
    } = this.datasources.typeORM.entities;

    return {
      countryLoader: this.getEntityLoader<Country>(
        CountryEntity, (parentFieldValues: any[]) => ({ where: { id: In(parentFieldValues) } }), 'id'
      ),
    };
  }

  private getEntityLoader = <Entity>(
    entity: ObjectType<Entity>,
    findOptions: (parentFieldValues: any[]) => FindManyOptions<Entity>,
    filterBy: string
  ) => {
    return new DataloaderLibrary(
      this.getLoader(entity, findOptions, filterBy)
    );
  }

  private getLoader = <Entity>(
    entity: ObjectType<Entity>,
    findOptions: (parentFieldValues: any[]) => FindManyOptions<Entity>,
    filterBy: string
  ) => async (parentFieldValues: number[]) => {
    const { connection } = this.datasources.typeORM;
    const response = await connection.manager.find<Entity>(entity, findOptions(parentFieldValues));
    return parentFieldValues.map((value) => response.filter((row: Entity) => row[filterBy] === value));
  }
}
