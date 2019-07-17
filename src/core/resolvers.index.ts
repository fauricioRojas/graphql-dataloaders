import clubModule from '../api/club/resolvers/club.index';
import countryModule from '../api/country/resolvers/country.index';
import personModule from '../api/person/resolvers/person.index';
import playerModule from '../api/player/resolvers/player.index';
import positionModule from '../api/position/resolvers/position.index';
import { generateDataloaderResolver } from '../dataloaders/dataloader-resolver.helper';

export const resolvers = {
  Query: {
    ...clubModule.queries,
    ...countryModule.queries,
    ...personModule.queries,
    ...playerModule.queries,
    ...positionModule.queries,
  },
  Person: {
    country: generateDataloaderResolver('countryLoader', 'countryId', false),
    player: generateDataloaderResolver('playerLoader', 'id', false),
  },
  Player: {
    person: generateDataloaderResolver('personLoader', 'personId', false),
    positions: generateDataloaderResolver('playerPositionLoader', 'id', true),
  },
  Club: {
    country: generateDataloaderResolver('countryLoader', 'countryId', false),
    players: generateDataloaderResolver('clubPlayerLoader', 'id', true),
  },
  Country: {
    clubs: generateDataloaderResolver('clubLoader', 'id', true),
    people: generateDataloaderResolver('personCountryLoader', 'id', true),
  },
  Position: {
    players: generateDataloaderResolver('positionPlayerLoader', 'id', true),
  }
};
