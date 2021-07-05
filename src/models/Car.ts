import { Schema, model } from 'mongoose';

export interface ICar {
  make: string;
  model: string;
  year: number;
  vin: string;
}

export const CarSchema = new Schema<ICar>({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  vin: { type: String, required: true, unique: true, autoIndex: true }
});

export const Car = model('Car', CarSchema);

export default Car;
