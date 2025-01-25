import { Earthquake } from '../models/earthquake.model';

export type ID = { id: string };

export type PaginationInput = {
  page: number;
  limit: number;
};

export type PaginatedEarthquakes = {
  total: number;
  page: number;
  pages: number;
  earthquakes: Earthquake[];
};
