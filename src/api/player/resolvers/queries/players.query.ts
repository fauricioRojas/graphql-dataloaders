import { GraphQLResolveInfo } from 'graphql';
import { IContext } from '../../../../core/context';
import { Player } from '../../../../datasources/typeorm/entities/player.model';
import { PlayersQueryArgs } from '../../../../types/schema';
import { getQueryFields } from '../../../../common/services/query-fields.service';

const players = async (
  parent,
  { take }: PlayersQueryArgs,
  context: IContext,
  info: GraphQLResolveInfo
  ): Promise<Player[]> => {
  const fields = getQueryFields<Array<keyof Player>>(info);
  const { connection, entities } = context.datasources.typeORM;
  return connection.manager.find(entities.Player, {
    take,
    select: [...new Set([...fields, ...Player.keyFields])]
  });
};

export default players;
