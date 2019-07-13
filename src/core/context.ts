import { PubSub } from 'graphql-yoga';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { IDatasources, getDatasources } from '../datasources';
import DataloaderService from '../dataloaders/dataloader.service';
import { IDataloaders } from '../dataloaders/dataloader.interface';

export interface IContext {
  request: any;
  datasources: IDatasources;
  dataloaders: IDataloaders;
  pubsub: PubSub;
}

export const getContext = (pubsub: PubSub) => (req: ContextParameters): IContext => {
  const datasources = getDatasources();
  return {
    request: req.request,
    datasources,
    dataloaders: new DataloaderService(datasources).generateDataloaders(),
    pubsub,
  };
};
