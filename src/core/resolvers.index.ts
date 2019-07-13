import personModule from '../api/person/resolvers/person.index';
import { generateDataloaderResolver } from '../dataloaders';

export const resolvers = {
  Query: {
    ...personModule.queries,
  },
  Person: {
    country: generateDataloaderResolver('countryLoader', 'countryId', false)
  }
};
