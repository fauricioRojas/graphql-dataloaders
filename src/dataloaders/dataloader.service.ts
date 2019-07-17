import * as Dataloader from 'dataloader';
import { In, FindManyOptions, ObjectType } from 'typeorm';

import { Club } from '../datasources/typeorm/entities/club.model';
import { ClubPlayer } from '../datasources/typeorm/entities/club-player.model';
import { Country } from '../datasources/typeorm/entities/country.model';
import { IDataloaders } from './dataloader.interface';
import { IDatasources } from '../datasources/index';
import { Person } from '../datasources/typeorm/entities/person.model';
import { Player } from '../datasources/typeorm/entities/player.model';
import { PlayerPosition } from '../datasources/typeorm/entities/player-position.model';

interface ILoader<Entity> {
  entity: ObjectType<Entity>;
  findOptions: (parentFieldValues: number[]) => FindManyOptions<Entity>;
  filterBy: string;
  childFilterKey?: string;
}

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
      countryLoader: this.getLoader<Country>({
        entity: CountryEntity,
        findOptions: (parentFieldValues: number[]) => ({
          where: { id: In(parentFieldValues) }
        }),
        filterBy: 'id',
      }),
      playerLoader: this.getLoader<Player>({
        entity: PlayerEntity,
        findOptions: (parentFieldValues: number[]) => ({
          where: { personId: In(parentFieldValues) }
        }),
        filterBy: 'personId',
      }),
      personLoader: this.getLoader<Person>({
        entity: PersonEntity,
        findOptions: (parentFieldValues: number[]) => ({
          where: { id: In(parentFieldValues) }
        }),
        filterBy: 'id',
      }),
      clubLoader: this.getLoader<Club>({
        entity: ClubEntity,
        findOptions: (parentFieldValues: number[]) => ({
          where: { countryId: In(parentFieldValues) }
        }),
        filterBy: 'countryId'
      }),
      personCountryLoader: this.getLoader<Person>({
        entity: PersonEntity,
        findOptions: (parentFieldValues: number[]) => ({
          where: { countryId: In(parentFieldValues) }
        }),
        filterBy: 'countryId',
      }),
      playerPositionLoader: this.getLoader<PlayerPosition>({
        entity: PlayerPositionEntity,
        findOptions: (parentFieldValues: number[]) => ({
          where: { playerId: In(parentFieldValues) },
          relations: ['position'],
        }),
        filterBy: 'playerId',
        childFilterKey: 'position'
      }),
      clubPlayerLoader: this.getLoader<ClubPlayer>({
        entity: ClubPlayerEntity,
        findOptions: (parentFieldValues: number[]) => ({
          where: { clubId: In(parentFieldValues) },
          relations: ['player'],
        }),
        filterBy: 'clubId',
        childFilterKey: 'player'
      }),
      positionPlayerLoader: this.getLoader<PlayerPosition>({
        entity: PlayerPosition,
        findOptions: (parentFieldValues: number[]) => ({
          where: { positionId: In(parentFieldValues) },
          relations: ['player'],
        }),
        filterBy: 'positionId',
        childFilterKey: 'player'
      }),
    };
  }

  private getLoader = <Entity>({
    entity,
    findOptions,
    filterBy,
    childFilterKey
  }: ILoader<Entity>) => new Dataloader(
    async (parentFieldValues: number[]) => {
      const { connection } = this.datasources.typeORM;
      const response = await connection.manager.find<Entity>(entity, findOptions(parentFieldValues));
      if (childFilterKey) {
        return parentFieldValues.map((value: number) => (
          response.reduce((rows: any[], row: Entity) => (
            row[filterBy] === value
              ? rows.concat(row[childFilterKey])
              : rows
          ), [])
        ));
      }
      return parentFieldValues.map((value: number) => (
        response.filter((row: Entity) => row[filterBy] === value))
      );
    }
  )
}
