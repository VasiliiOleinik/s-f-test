import Earthquake from '../models/earthquake.model';
import { ID, PaginationInput } from '../types';
import { getPaginatedEarthquakes } from '../utils/getPaginatedEarthquakes';
import { GraphQLUpload } from 'graphql-upload-minimal';
import { uploadFile } from '../utils/uploadFile';
import { parseCSV } from '../utils/parseCSV';

export const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    getEarthquakes: async (
      _: any,
      { pagination }: { pagination: PaginationInput }
    ) => {
      try {
        return await getPaginatedEarthquakes(pagination || {});
      } catch (error) {
        throw new Error(`Earthquakes fetch failed: ${error}`);
      }
    },
  },
  Mutation: {
    addEarthquake: async (_: any, { location, magnitude, date }: any) => {
      const earthquake = new Earthquake({ location, magnitude, date });
      return await earthquake.save();
    },
    updateEarthquake: async (_: any, { id, ...update }: ID) => {
      return await Earthquake.findByIdAndUpdate(id, update, { new: true });
    },
    deleteEarthquake: async (_: any, { id }: ID) => {
      try {
        const response = await Earthquake.findByIdAndDelete(id);
        return !!response;
      } catch (error) {
        throw new Error(`Failed to delete earthquake: ${error}`);
      }
    },
    uploadEarthquakesCSV: async (_: any, { file }: { file: any }) => {
      try {
        const filePath = await uploadFile(file);
        return await parseCSV(filePath);
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`File processing error: ${error.message}`);
        }
        throw new Error(`File processing error: ${String(error)}`);
      }
    },
  },
};
