import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schema/earthquake.schema';
import { resolvers } from './resolvers/earthquake.resolver';
import connectToDatabase from './database/connect';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import uploadRoute from './routes/uploadRoute';

dotenv.config();

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());

  app.use('/graphql', bodyParser.json(), expressMiddleware(server));

  // app.use(uploadRoute);

  await connectToDatabase();

  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/graphql');
  });
};

startServer();
