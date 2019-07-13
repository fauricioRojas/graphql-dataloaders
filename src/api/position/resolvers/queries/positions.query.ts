import { GraphQLResolveInfo } from 'graphql';
import { IContext } from '../../../../core/context';
import { Position } from '../../../../datasources/typeorm/entities/position.model';
import { PositionsQueryArgs } from '../../../../types/schema';
import { getQueryFields } from '../../../../common/services/query-fields.service';

const positions = async (
  parent: any,
  { take }: PositionsQueryArgs,
  context: IContext,
  info: GraphQLResolveInfo
  ): Promise<Position[]> => {
  const fields = getQueryFields<Array<keyof Position>>(info);
  const { connection, entities } = context.datasources.typeORM;
  return connection.manager.find(entities.Position, {
    take,
    // select: [...new Set([...fields, ...Position.keyFields])]
  });
};

export default positions;
