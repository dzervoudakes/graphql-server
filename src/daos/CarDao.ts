import { Car, CarType } from '../models';

export class CarDao {
  public async getCars(): Promise<CarType[]> {
    const result = await Car.find({});
    return result;
  }

  public async getCar(id: string): Promise<CarType | null> {
    const result = await Car.findById(id);
    return result;
  }

  public async createCar(user: CarType): Promise<CarType> {
    const result = await Car.create(user);
    return result;
  }

  public async updateCar(id: string, user: CarType): Promise<CarType | null> {
    const result = await Car.findByIdAndUpdate(id, user, { new: true });
    return result;
  }

  public async deleteUser(id: string): Promise<CarType | null> {
    const result = await Car.findByIdAndDelete(id);
    return result;
  }
}

export default CarDao;
