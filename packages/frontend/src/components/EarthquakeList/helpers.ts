import { EarthquakeSchemaType } from '../EarthquakeForm/helpers';
import { EarthquakeDBSchemaType } from '@/types';

export function prepareEarthquakeData(data: EarthquakeDBSchemaType[]): {
  earthquakes: EarthquakeSchemaType[];
} {
  return {
    earthquakes: data.map(({ id, location, magnitude, date }) => ({
      id,
      location,
      magnitude: magnitude.toString(),
      date,
    })),
  };
}
