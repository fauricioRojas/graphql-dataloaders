import { PubSub } from 'graphql-yoga';
import { ContextParameters } from 'graphql-yoga/dist/types';

export interface IContext {
  request: any;
  services: any;
  pubsub: PubSub;
}

export const getContext = (pubsub: PubSub) => (req: ContextParameters): IContext => {
  return {
    request: req.request,
    services: {},
    pubsub,
  };
};
