import Earthquake from '../models/earthquake.model';
import { ID, PaginationInput } from '../types';
import { getPaginatedEarthquakes } from '../utils/getPaginatedEarthquakes';
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { GraphQLUpload } from 'graphql-upload-minimal';

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
      if (!file) {
        throw new Error("File not received by server!");
      }

      const { createReadStream, filename } = await file;
      const uploadDir = path.join(__dirname, '../../uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);

      return new Promise((resolve, reject) => {
        const stream = createReadStream();
        const writeStream = fs.createWriteStream(filePath);

        stream.pipe(writeStream);

        writeStream.on('finish', async () => {

          writeStream.close();

          const earthquakes: any[] = [];

          fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row: Record<string, string>) => {

              earthquakes.push({
                location: row?.location || `${row['Latitude']}, ${row['Longitude']}`,
                magnitude: row?.magnitude || parseFloat(row['Magnitude']),
                date: row?.date || row['DateTime'],
              });

              if (earthquakes.length >= 500) {
                Earthquake.insertMany(earthquakes);
                earthquakes.length = 0;
              }
            })
            .on('end', async () => {
              if (earthquakes.length > 0) {
                await Earthquake.insertMany(earthquakes);
              }
              resolve({ success: true, message: `${filename} loaded and processed` });
            })
            .on('error', (error) => {
              reject(new Error(`CSV parsing error: ${error.message}`));
            });
        });

        writeStream.on('error', (error) => {
          reject(new Error(`Error saving file: ${error.message}`));
        });
      });
    },
  },
};
