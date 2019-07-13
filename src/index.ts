import './common/config/initial-setup';
import { GraphQLServer, PubSub, Options } from 'graphql-yoga';
import { resolvers } from './core/resolvers.index';
import { getContext } from './core/context';
import { middlewares } from './middlewares';
import 'reflect-metadata';

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: './src/api/schema.graphql',
  resolvers,
  middlewares,
  context: getContext(pubsub),
});
const options: Options = {
  port: process.env.YOGA_PORT,
  playground: process.env.NODE_ENV === 'prod' ? false : '/'
};

server.start(options, ({ port }) => {
  console.log(`Server is up and running on port ${port}`);
});
