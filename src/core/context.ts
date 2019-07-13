import { PubSub } from 'graphql-yoga';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { IDatasources, getDatasources } from '../datasources';

export interface IContext {
  request: any;
  datasources: IDatasources;
  services: any;
  pubsub: PubSub;
}

export const getContext = (pubsub: PubSub) => (req: ContextParameters): IContext => {
  const datasources = getDatasources();
  return {
    request: req.request,
    datasources,
    services: {},
    pubsub,
  };
};
