import mongoose, { Schema, Document } from 'mongoose';

export interface Earthquake extends Document {
  location: string;
  magnitude: number;
  date: Date;
}

const EarthquakeSchema: Schema = new Schema({
  location: { type: String, required: true },
  magnitude: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model<Earthquake>('Earthquake', EarthquakeSchema);
