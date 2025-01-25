import multer from 'multer';
import path from 'path';
import fs from 'fs';
import csvParser from 'csv-parser';
import { EarthquakeType } from './types';
import Earthquake from '../models/earthquake.model';
import { convertDateToUnix } from './convertDateToUnix';

const upload = multer({ dest: path.resolve(__dirname, '../../uploads') });

export const uploadCSV = upload.single('file');

function getLocation(data: EarthquakeType): string {
  return `${data['Latitude']}, ${data['Longitude']}`;
}

export async function processCSV(filePath: string): Promise<void> {
  const records: EarthquakeType[] = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        records.push({
          location: getLocation(row),
          magnitude: row['Magnitude'],
          date: convertDateToUnix(row['DateTime']),
        });
      })
      .on('end', resolve)
      .on('error', reject);
  });

  fs.unlinkSync(filePath);

  await Earthquake.insertMany(records);
}
