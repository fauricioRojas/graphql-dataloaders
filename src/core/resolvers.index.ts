import personModule from '../api/person/resolvers/person.index';
import playerModule from '../api/player/resolvers/player.index';
import { generateDataloaderResolver } from '../dataloaders';

export const resolvers = {
  Query: {
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
};
