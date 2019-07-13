import clubModule from '../api/club/resolvers/club.index';
import personModule from '../api/person/resolvers/person.index';
import playerModule from '../api/player/resolvers/player.index';
import { generateDataloaderResolver } from '../dataloaders';

export const resolvers = {
  Query: {
    ...clubModule.queries,
    ...personModule.queries,
    ...playerModule.queries,
  },
  Person: {
    country: generateDataloaderResolver('countryLoader', 'countryId', false),
    player: generateDataloaderResolver('playerLoader', 'id', false)
  },
  Player: {
    person: generateDataloaderResolver('personLoader', 'personId', false),
  },
  Club: {
    country: generateDataloaderResolver('countryLoader', 'countryId', false),
  },
  Country: {
    clubs: generateDataloaderResolver('clubLoader', 'id', true),
  }
};
