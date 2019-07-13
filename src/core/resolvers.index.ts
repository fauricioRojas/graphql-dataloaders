import personModule from '../api/person/resolvers/person.index';

export const resolvers = {
  Query: {
    ...personModule.queries,
  },
};
