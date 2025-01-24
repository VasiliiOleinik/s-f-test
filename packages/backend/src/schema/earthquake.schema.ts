import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Earthquake {
    id: ID!
    location: String!
    magnitude: Float!
    date: String!
  }

  type Query {
    getEarthquakes: [Earthquake!]
  }

  type Mutation {
    addEarthquake(
      location: String!
      magnitude: Float!
      date: String!
    ): Earthquake
    updateEarthquake(
      id: ID!
      location: String
      magnitude: Float
      date: String
    ): Earthquake
    deleteEarthquake(id: ID!): Boolean
  }
`;
