import { IDataloaders } from './dataloader.interface';
import { In, FindManyOptions, ObjectType } from 'typeorm';
import { IDatasources } from '../datasources/index';
import { Country } from '../datasources/typeorm/entities/country.model';
import { Player } from '../datasources/typeorm/entities/player.model';
import * as Dataloader from 'dataloader';
import { Person } from '../datasources/typeorm/entities/person.model';
import { Club } from '../datasources/typeorm/entities/club.model';
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
      countryLoader: this.getLoader<Country>(
        CountryEntity,
        (parentFieldValues: number[]) => ({ where: { id: In(parentFieldValues) } }),
        'id'
      ),
      playerLoader: this.getLoader<Player>(
        PlayerEntity,
        (parentFieldValues: number[]) => ({ where: { personId: In(parentFieldValues) } }),
        'personId'
      ),
      personLoader: this.getLoader<Person>(
        PersonEntity,
        (parentFieldValues: number[]) => ({ where: { id: In(parentFieldValues) } }),
        'id'
      ),
      personCountryLoader: this.getLoader<Person>(
        PersonEntity,
        (parentFieldValues: number[]) => ({ where: { countryId: In(parentFieldValues) } }),
        'countryId'
      ),
      playerPositionLoader: this.getLoader<PlayerPosition>(
        PlayerPositionEntity,
        (parentFieldValues: number[]) => ({ where: { playerId: In(parentFieldValues) } }),
        'playerId'
      ),
      clubLoader: this.getLoader<Club>(
        ClubEntity,
        (parentFieldValues: number[]) => ({ where: { countryId: In(parentFieldValues) } }),
        'countryId'
      ),
      clubPlayerLoader: this.getLoaderWithJoin<ClubPlayer, Player>(
        ClubPlayerEntity,
        (parentFieldValues: number[]) => ({
          where: { clubId: In(parentFieldValues) },
          relations: ['player']
        }),
        'clubId',
        '__player__'
      ),
    };
  }

  private getLoader = <Entity>(
    entity: ObjectType<Entity>,
    findOptions: (parentFieldValues: number[]) => FindManyOptions<Entity>,
    filterBy: string
  ) => new Dataloader(
    async (parentFieldValues: number[]) => {
      const { connection } = this.datasources.typeORM;
      const response = await connection.manager
        .find<Entity>(entity, findOptions(parentFieldValues));
      return parentFieldValues
        .map((value) => response.filter((row: Entity) => row[filterBy] === value));
    }
  )

  private getLoaderWithJoin = <Entity, ChildEntity>(
    entity: ObjectType<Entity>,
    findOptions: (parentFieldValues: number[]) => FindManyOptions<Entity>,
    filterBy: string,
    childFilterKey: string
  ) => new Dataloader(
    async (parentFieldValues: number[]) => {
      const { connection } = this.datasources.typeORM;
      const response = await connection.manager
        .find<Entity>(entity, findOptions(parentFieldValues));
      return parentFieldValues
        .map((value: number) => response
          .reduce((rows: ChildEntity[], row: Entity) => (
            row[filterBy] === value
              ? rows.concat(row[childFilterKey])
              : rows
          ), [])
        );
    }
  )
}
