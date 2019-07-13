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
    console.log('generateDataloaderResolver()');
    console.log('parent:', parent);
    console.log('parentField:', parentField);
    const records = await context.dataloaders[dataloader].load(parent[parentField]);
    console.log('records:', records);
    return multiple ? records : records[0];
  }
);
