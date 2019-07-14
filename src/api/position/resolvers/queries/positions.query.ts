import { GraphQLResolveInfo } from 'graphql';
import { IContext } from '../../../../core/context';
import { Position } from '../../../../datasources/typeorm/entities/position.model';
import { PositionsQueryArgs } from '../../../../types/schema';

const positions = async (
  parent: any,
  { take }: PositionsQueryArgs,
  context: IContext,
  info: GraphQLResolveInfo
  ): Promise<Position[]> => {
  const { connection, entities } = context.datasources.typeORM;
  return connection.manager.find(entities.Position, {
    take,
  });
};

export default positions;
