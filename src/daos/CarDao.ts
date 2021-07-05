import { Car, ICar } from '@src/models';

export class CarDao {
  public async getAllCars(): Promise<ICar[]> {
    const result = await Car.find({});
    return result;
  }

  public async getCar(id: string): Promise<ICar | null> {
    const result = await Car.findById(id);
    return result;
  }

  public async getCarsByMakeAndModel(make: string, model: string): Promise<ICar[]> {
    const result = await Car.find({ make, model });
    return result;
  }

  public async createCar(car: ICar): Promise<ICar> {
    const result = await Car.create(car);
    return result;
  }

  public async updateCar(id: string, car: ICar): Promise<ICar | null> {
    const result = await Car.findByIdAndUpdate(id, car, { new: true });
    return result;
  }

  public async deleteCar(id: string): Promise<ICar | null> {
    const result = await Car.findByIdAndDelete(id);
    return result;
  }
}

export default CarDao;
