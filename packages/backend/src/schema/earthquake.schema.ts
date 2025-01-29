import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Upload

  type Earthquake {
    id: ID!
    location: String!
    magnitude: Float!
    date: String!
  }

  type PaginatedEarthquakesResponse {
    total: Int!
    page: Int!
    pages: Int!
    earthquakes: [Earthquake!]!
  }

  type UploadResponse {
    success: Boolean!
    message: String!
  }

  input PaginationInput {
    page: Int
    limit: Int
  }

  type Query {
    getEarthquakes(pagination: PaginationInput): PaginatedEarthquakesResponse!
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
    uploadEarthquakesCSV(file: Upload!): UploadResponse!
  }
`;
