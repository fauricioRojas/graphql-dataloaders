import { GraphQLResolveInfo } from 'graphql';

import { IContext } from '../core/context';
import { IDataloaders } from './dataloader.interface';

export const generateDataloaderResolver = (
  dataloader: keyof IDataloaders,
  parentField: string,
  multiple: boolean
) => (
  async (
    parent: any,
    args: any,
    context: IContext,
    info: GraphQLResolveInfo
  ) => {
    const records = await context.dataloaders[dataloader].load({
      id: parent[parentField],
      info
    });
    return multiple ? records : records[0];
  }
);
