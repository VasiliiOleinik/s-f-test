import fs from 'fs';
import csvParser from 'csv-parser';
import Earthquake from '../models/earthquake.model';

export const parseCSV = async (filePath: string, batchSize: number = 500) => {
  return new Promise((resolve, reject) => {
    const earthquakes: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row: Record<string, string>) => {
        earthquakes.push({
          location: row?.location || `${row['Latitude']}, ${row['Longitude']}`,
          magnitude: row?.magnitude || parseFloat(row['Magnitude']),
          date: row?.date || row['DateTime'],
        });

        if (earthquakes.length >= batchSize) {
          Earthquake.insertMany(earthquakes);
          earthquakes.length = 0;
        }
      })
      .on('end', async () => {
        if (earthquakes.length > 0) {
          await Earthquake.insertMany(earthquakes);
        }
        resolve({ success: true, message: `CSV loaded and processed` });
      })
      .on('error', (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      });
  });
};
