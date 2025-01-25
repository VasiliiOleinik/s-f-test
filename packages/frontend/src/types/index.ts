export type ID<T = string> = T;

export type EarthquakeDBSchemaType = {
  id: ID;
  location: string;
  magnitude: number;
  date: string;
};
