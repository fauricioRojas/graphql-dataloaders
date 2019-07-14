import { GraphQLResolveInfo } from 'graphql';
import { IContext } from '../../../../core/context';
import { Player } from '../../../../datasources/typeorm/entities/player.model';
import { PlayersQueryArgs } from '../../../../types/schema';

const players = async (
  parent: any,
  { take }: PlayersQueryArgs,
  context: IContext,
  info: GraphQLResolveInfo
  ): Promise<Player[]> => {
  const { connection, entities } = context.datasources.typeORM;
  return connection.manager.find(entities.Player, {
    take,
  });
};

export default players;
