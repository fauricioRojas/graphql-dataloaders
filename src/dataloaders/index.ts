import { IContext } from '../core/context';
import { GraphQLResolveInfo } from 'graphql';
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
    const records = await context.dataloaders[dataloader].load(parent[parentField]);
    return multiple ? records : records[0];
  }
);
