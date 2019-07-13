import { GraphQLResolveInfo } from 'graphql';
import { IContext } from '../../../../core/context';
import { Person } from '../../../../datasources/typeorm/entities/person.model';
import { PeopleQueryArgs } from '../../../../types/schema';
import { getQueryFields } from '../../../../common/services/query-fields.service';

const people = async (
  parent: any,
  { take }: PeopleQueryArgs,
  context: IContext,
  info: GraphQLResolveInfo
  ): Promise<Person[]> => {
  const fields = getQueryFields<Array<keyof Person>>(info);
  const { connection, entities } = context.datasources.typeORM;
  return connection.manager.find(entities.Person, {
    take,
    select: [...new Set([...fields, ...Person.keyFields])]
  });
};

export default people;
