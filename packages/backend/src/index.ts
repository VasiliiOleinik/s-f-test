import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schema/earthquake.schema';
import { resolvers } from './resolvers/earthquake.resolver';
import connectToDatabase from './database/connect';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlUploadExpress } from 'graphql-upload-minimal';

dotenv.config();

const startServer = async () => {
  const app = express();

  app.use(graphqlUploadExpress());
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors({
    origin: ["http://localhost:3000", "https://s-f-test.vercel.app/"],
    credentials: true,
    methods: ['POST', 'GET', 'OPTIONS'],
  }));

  app.use('/graphql', bodyParser.json(), expressMiddleware(server));

  await connectToDatabase();

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}/graphql`);
  });
};

startServer();
