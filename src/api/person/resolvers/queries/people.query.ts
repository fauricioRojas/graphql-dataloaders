import { GraphQLResolveInfo } from 'graphql';
import { IContext } from '../../../../core/context';
import { Person } from '../../../../datasources/typeorm/entities/person.model';
import { PeopleQueryArgs } from '../../../../types/schema';

const people = async (
  parent: any,
  { take }: PeopleQueryArgs,
  context: IContext,
  info: GraphQLResolveInfo
  ): Promise<Person[]> => {
  const { connection, entities } = context.datasources.typeORM;
  return connection.manager.find(entities.Person, {
    take,
  });
};

export default people;
