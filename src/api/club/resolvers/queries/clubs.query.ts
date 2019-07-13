import { GraphQLResolveInfo } from 'graphql';
import { IContext } from '../../../../core/context';
import { Club } from '../../../../datasources/typeorm/entities/club.model';
import { ClubsQueryArgs } from '../../../../types/schema';
import { getQueryFields } from '../../../../common/services/query-fields.service';

const clubs = async (
  parent,
  { take }: ClubsQueryArgs,
  context: IContext,
  info: GraphQLResolveInfo
): Promise<Club[]> => {
  const fields = getQueryFields<Array<keyof Club>>(info);
  const { connection, entities } = context.datasources.typeORM;
  return connection.manager.find(entities.Club, {
    take,
    // select: [...new Set([...fields, Club.keyFields])]
  });
};

export default clubs;
