import { Schema, model } from 'mongoose';

export interface CarType {
  make: string;
  model: string;
  year: number;
  vin: string;
}

export const CarSchema = new Schema<CarType>({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true, unique: true },
  vin: { type: String, required: true }
});

export const Car = model('Car', CarSchema);

export default Car;
