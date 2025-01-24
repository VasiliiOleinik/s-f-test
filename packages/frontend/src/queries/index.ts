import { gql } from '@apollo/client';

export const GET_EARTHQUAKES = gql`
  query GetEarthquakes {
    getEarthquakes {
      id
      location
      magnitude
      date
    }
  }
`;

export const ADD_EARTHQUAKE = gql`
  mutation AddEarthquake(
    $location: String!
    $magnitude: Float!
    $date: String!
  ) {
    addEarthquake(location: $location, magnitude: $magnitude, date: $date) {
      id
      location
      magnitude
      date
    }
  }
`;

export const DELETE_EARTHQUAKE = gql`
  mutation DeleteEarthquake($id: ID!) {
    deleteEarthquake(id: $id)
  }
`;

export const UPDATE_EARTHQUAKE = gql`
  mutation AddEarthquake(
    $id: ID!
    $location: String!
    $magnitude: Float!
    $date: String!
  ) {
    addEarthquake(
      id: $id
      location: $location
      magnitude: $magnitude
      date: $date
    ) {
      id
      location
      magnitude
      date
    }
  }
`;
