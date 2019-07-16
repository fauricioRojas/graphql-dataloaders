import { IDataloaders } from './dataloader.interface';
import { In, FindManyOptions, ObjectType } from 'typeorm';
import { IDatasources } from '../datasources/index';
import { Country } from '../datasources/typeorm/entities/country.model';
import { Player } from '../datasources/typeorm/entities/player.model';
import * as Dataloader from 'dataloader';
import { Person } from '../datasources/typeorm/entities/person.model';
import { Club } from '../datasources/typeorm/entities/club.model';
import { Position } from '../datasources/typeorm/entities/position.model';
import { ClubPlayer } from '../datasources/typeorm/entities/club-player.model';
import { PlayerPosition } from '../datasources/typeorm/entities/player-position.model';

export default class DataloaderService {
  constructor(private datasources: IDatasources) {}

  public generateDataloaders = (): IDataloaders => {
    const {
      Country: CountryEntity,
      Player: PlayerEntity,
      Person: PersonEntity,
      Club: ClubEntity,
      ClubPlayer: ClubPlayerEntity,
      PlayerPosition: PlayerPositionEntity,
    } = this.datasources.typeORM.entities;

    return {
      countryLoader: this.getEntityLoader<Country>(
        CountryEntity,
        (parentFieldValues: number[]) => ({ where: { id: In(parentFieldValues) } }),
        'id'
      ),
      playerLoader: this.getEntityLoader<Player>(
        PlayerEntity,
        (parentFieldValues: number[]) => ({ where: { personId: In(parentFieldValues) } }),
        'personId'
      ),
      personLoader: this.getEntityLoader<Person>(
        PersonEntity,
        (parentFieldValues: number[]) => ({ where: { id: In(parentFieldValues) } }),
        'id'
      ),
      personCountryLoader: this.getEntityLoader<Person>(
        PersonEntity,
        (parentFieldValues: number[]) => ({ where: { countryId: In(parentFieldValues) } }),
        'countryId'
      ),
      playerPositionLoader: this.getEntityLoader<PlayerPosition>(
        PlayerPositionEntity,
        (parentFieldValues: number[]) => ({ where: { playerId: In(parentFieldValues) } }),
        'playerId'
      ),
      clubLoader: this.getEntityLoader<Club>(
        ClubEntity,
        (parentFieldValues: number[]) => ({ where: { countryId: In(parentFieldValues) } }),
        'countryId'
      ),
      clubPlayerLoader: this.getEntityLoader<ClubPlayer>(
        ClubPlayerEntity,
        (parentFieldValues: number[]) => ({ where: { clubId: In(parentFieldValues) } }),
        'clubId'
      ),
    };
  }

  private getEntityLoader = <Entity>(
    entity: ObjectType<Entity>,
    findOptions: (parentFieldValues: number[]) => FindManyOptions<Entity>,
    filterBy: string
  ) => {
    return new Dataloader(
      this.getLoader(entity, findOptions, filterBy)
    );
  }

  private getLoader = <Entity>(
    entity: ObjectType<Entity>,
    findOptions: (parentFieldValues: number[]) => FindManyOptions<Entity>,
    filterBy: string
  ) => async (parentFieldValues: number[]) => {
    const { connection } = this.datasources.typeORM;
    const response = await connection.manager.find<Entity>(entity, findOptions(parentFieldValues));
    return parentFieldValues.map((value) => response.filter((row: Entity) => row[filterBy] === value));
  }
}
