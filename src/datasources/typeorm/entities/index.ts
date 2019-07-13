import { ClubPlayer } from './club-player.model';
import { Club } from './club.model';
import { Country } from './country.model';
import { Person } from './person.model';
import { PlayerPosition } from './player-position.model';
import { Player } from './player.model';
import { Position } from './position.model';

export interface ITypeORMEntities {
  ClubPlayer: typeof ClubPlayer;
  Club: typeof Club;
  Country: typeof Country;
  Person: typeof Person;
  PlayerPosition: typeof PlayerPosition;
  Player: typeof Player;
  Position: typeof Position;
}

export const entities: ITypeORMEntities = {
  ClubPlayer,
  Club,
  Country,
  Person,
  PlayerPosition,
  Player,
  Position,
};
