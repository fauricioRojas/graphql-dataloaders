import { IDataloaders } from './dataloader.interface';
import { In, FindManyOptions, ObjectType } from 'typeorm';
import { IDatasources } from '../datasources/index';
import { Country } from '../datasources/typeorm/entities/country.model';
import { Player } from '../datasources/typeorm/entities/player.model';
import * as Dataloader from 'dataloader';
import { Person } from '../datasources/typeorm/entities/person.model';
import { Club } from '../datasources/typeorm/entities/club.model';
import { ClubPlayer } from '../datasources/typeorm/entities/club-player.model';

export default class DataloaderService {
  constructor(private datasources: IDatasources) {}

  public generateDataloaders = (): IDataloaders => {
    const {
      Country: CountryEntity,
      Player: PlayerEntity,
      Person: PersonEntity,
      Club: ClubEntity,
      ClubPlayer: ClubPlayerEntity,
    } = this.datasources.typeORM.entities;

    return {
      countryLoader: this.getEntityLoader<Country>(
        CountryEntity, (parentFieldValues: any[]) => ({ where: { id: In(parentFieldValues) } }), 'id'
      ),
      playerLoader: this.getEntityLoader<Player>(
        PlayerEntity, (parentFieldValues: any[]) => ({ where: { personId: In(parentFieldValues) } }), 'personId'
      ),
      personLoader: this.getEntityLoader<Person>(
        PersonEntity, (parentFieldValues: any[]) => ({ where: { id: In(parentFieldValues) } }), 'id'
      ),
      personInCountryLoader: this.getEntityLoader<Person>(
        PersonEntity, (parentFieldValues: any[]) => ({ where: { countryId: In(parentFieldValues) } }), 'countryId'
      ),
      clubLoader: this.getEntityLoader<Club>(
        ClubEntity, (parentFieldValues: any[]) => ({ where: { countryId: In(parentFieldValues) } }), 'countryId'
      ),
      clubPlayerLoader: this.getEntityLoader<ClubPlayer>(
        ClubPlayerEntity, (parentFieldValues: any[]) => ({ where: { clubId: In(parentFieldValues) } }), 'clubId'
      ),
    };
  }

  private getEntityLoader = <Entity>(
    entity: ObjectType<Entity>,
    findOptions: (parentFieldValues: any[]) => FindManyOptions<Entity>,
    filterBy: string
  ) => {
    return new Dataloader(
      this.getLoader(entity, findOptions, filterBy)
    );
  }

  private getLoader = <Entity>(
    entity: ObjectType<Entity>,
    findOptions: (parentFieldValues: any[]) => FindManyOptions<Entity>,
    filterBy: string
  ) => async (parentFieldValues: number[]) => {
    console.log('getLoader()');
    console.log('parentFieldValues:', parentFieldValues);
    console.log('filterBy:', filterBy);
    const { connection } = this.datasources.typeORM;
    const response = await connection.manager.find<Entity>(entity, findOptions(parentFieldValues));
    console.log('response:', response);
    return parentFieldValues.map((value) => response.filter((row: Entity) => row[filterBy] === value));
  }
}
