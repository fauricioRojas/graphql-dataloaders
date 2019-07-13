import { GraphQLResolveInfo } from 'graphql';
import { IContext } from '../../../../core/context';
import { Country } from '../../../../datasources/typeorm/entities/country.model';
import { CountriesQueryArgs } from '../../../../types/schema';

const countries = async (
  parent: any,
  { take }: CountriesQueryArgs,
  context: IContext,
  info: GraphQLResolveInfo
): Promise<Country[]> => {
  const { connection, entities } = context.datasources.typeORM;
  return connection.manager.find(entities.Country, {
    take
  });
};

export default countries;
