import { GraphQLResolveInfo } from 'graphql';
import { IContext } from '../../../../core/context';
import { Club } from '../../../../datasources/typeorm/entities/club.model';
import { ClubsQueryArgs } from '../../../../types/schema';

const clubs = async (
  parent: any,
  { take }: ClubsQueryArgs,
  context: IContext,
  info: GraphQLResolveInfo
): Promise<Club[]> => {
  const { connection, entities } = context.datasources.typeORM;
  return connection.manager.find(entities.Club, {
    take,
  });
};

export default clubs;
