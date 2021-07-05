import mongoose, { Mongoose } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CarDao } from '@src/daos';
import { Car } from '@src/models';
import { mockCarOne, mockCarTwo, mockCarThree } from './utils';

describe('CarDao', () => {
  let connection: Mongoose;

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.MONGO_URL || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it('gets a list of cars', async () => {
    const carDao = new CarDao();

    await Car.create([mockCarOne, mockCarTwo]);
    const result = await carDao.getAllCars();

    expect(result?.[0].make).toEqual(mockCarOne.make);
    expect(result?.[0].model).toEqual(mockCarOne.model);
    expect(result?.[0].year).toEqual(mockCarOne.year);
    expect(result?.[0].vin).toEqual(mockCarOne.vin);

    expect(result?.[1].make).toEqual(mockCarTwo.make);
    expect(result?.[1].model).toEqual(mockCarTwo.model);
    expect(result?.[1].year).toEqual(mockCarTwo.year);
    expect(result?.[1].vin).toEqual(mockCarTwo.vin);
  });

  it('gets a car by id', async () => {
    const carDao = new CarDao();
    const payload = { ...mockCarOne, vin: uuidv4() };

    const car = await Car.create(payload);
    const result = await carDao.getCar(car._id);

    expect(result?.make).toEqual(payload.make);
    expect(result?.model).toEqual(payload.model);
    expect(result?.year).toEqual(payload.year);
    expect(result?.vin).toEqual(payload.vin);
  });

  it('gets cars by make and model', async () => {
    const carDao = new CarDao();
    const payload = { ...mockCarOne, vin: uuidv4() };

    const car = await Car.create(payload);
    const result = await carDao.getCarsByMakeAndModel(car.make, car.model);

    expect(result?.[0].make).toEqual(payload.make);
    expect(result?.[0].model).toEqual(payload.model);
    expect(result.length).toBeGreaterThan(1);
  });

  it('creates a car', async () => {
    const carDao = new CarDao();

    const result = await carDao.createCar(mockCarThree);

    expect(result?.make).toEqual(mockCarThree.make);
    expect(result?.model).toEqual(mockCarThree.model);
    expect(result?.year).toEqual(mockCarThree.year);
    expect(result?.vin).toEqual(mockCarThree.vin);
  });

  it('updates a car', async () => {
    const carDao = new CarDao();
    const payload = { ...mockCarThree, vin: uuidv4() };

    const car = await Car.create(payload);
    const result = await carDao.updateCar(car._id, {
      ...payload,
      year: 2017
    });

    expect(result?.year).toEqual(2017);
  });

  it('deletes a car', async () => {
    const carDao = new CarDao();
    const payload = { ...mockCarOne, vin: uuidv4() };

    const car = await Car.create(payload);
    await carDao.deleteCar(car._id);

    const result = await carDao.getCar(car._id);
    expect(result).toBeNull();
  });
});
