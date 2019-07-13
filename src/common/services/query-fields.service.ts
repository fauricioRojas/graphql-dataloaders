import * as graphQLFields from 'graphql-fields';
import { GraphQLResolveInfo } from 'graphql';

const flattenQueryFields = <Entity>(queryFields: any): Entity => (
  Object.keys(queryFields).reduce((fields: string[], key: string) => {
    const value = queryFields[key];
    return Object.keys(value).length
      ? fields
      : [
        ...fields, key
      ];
  }, []) as any as Entity
);

export const getQueryFields = <Entity>(
  info: GraphQLResolveInfo
): Entity => {
  const queryFields = graphQLFields(info);
  return flattenQueryFields<Entity>(queryFields);
};
