import supertest, { SuperTest, Test } from 'supertest';
import { Application } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Server from '@src/Server';
import { mockCarOne, mockCarTwo, mockCarThree } from './utils';

jest.mock('@src/daos/CarDao', () => {
  return {
    CarDao: jest.fn().mockImplementation(() => {
      return {
        getAllCars: jest.fn().mockImplementation(() => [
          { ...mockCarOne, id: uuidv4() },
          { ...mockCarTwo, id: uuidv4() }
        ]),
        getCar: jest.fn().mockImplementation(() => ({ ...mockCarOne, id: uuidv4() })),
        getCarsByMakeAndModel: jest.fn(() => [{ ...mockCarOne, id: uuidv4() }]),
        createCar: jest
          .fn()
          .mockImplementation(() => ({ ...mockCarThree, id: uuidv4() })),
        updateCar: jest
          .fn()
          .mockImplementation(() => ({ ...mockCarThree, model: 'Golf R', id: uuidv4() })),
        deleteCar: jest.fn()
      };
    })
  };
});

jest.mock('mongoose', () => ({
  ...(jest.requireActual('mongoose') as jest.Mock),
  connect: jest.fn()
}));

class MockServer extends Server {
  public getExpressInstance(): Application {
    return this.app;
  }
}

describe('Server', () => {
  let agent: SuperTest<Test>;

  beforeAll(() => {
    const server = new MockServer();
    agent = supertest.agent(server.getExpressInstance());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('gets a list of cars', async () => {
    const result = await agent
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: '{ getAllCars { id make model year vin } }' });

    const { data } = JSON.parse(result.text);

    expect(result.statusCode).toBe(200);
    expect(data.getAllCars[0].make).toEqual(mockCarOne.make);
    expect(data.getAllCars[0].model).toEqual(mockCarOne.model);
    expect(data.getAllCars[0].year).toEqual(mockCarOne.year);
    expect(data.getAllCars[0].vin).toEqual(mockCarOne.vin);
    expect(data.getAllCars[1].make).toEqual(mockCarTwo.make);
    expect(data.getAllCars[1].model).toEqual(mockCarTwo.model);
    expect(data.getAllCars[1].year).toEqual(mockCarTwo.year);
    expect(data.getAllCars[1].vin).toEqual(mockCarTwo.vin);
  });

  it('gets a car by id', async () => {
    const result = await agent
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: '{ getCarById(id: "12345") { id make model year vin } }' });

    const { data } = JSON.parse(result.text);

    expect(result.statusCode).toBe(200);
    expect(data.getCarById.make).toEqual(mockCarOne.make);
    expect(data.getCarById.model).toEqual(mockCarOne.model);
    expect(data.getCarById.year).toEqual(mockCarOne.year);
    expect(data.getCarById.vin).toEqual(mockCarOne.vin);
  });

  it('gets a list of cars by make and model', async () => {
    const result = await agent
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        query:
          '{ getCarsByMakeAndModel(make: "Acura", model: "TSX") { id make model year vin } }'
      });

    const { data } = JSON.parse(result.text);

    expect(result.statusCode).toBe(200);
    expect(data.getCarsByMakeAndModel[0].make).toEqual(mockCarOne.make);
    expect(data.getCarsByMakeAndModel[0].model).toEqual(mockCarOne.model);
    expect(data.getCarsByMakeAndModel[0].year).toEqual(mockCarOne.year);
    expect(data.getCarsByMakeAndModel[0].vin).toEqual(mockCarOne.vin);
  });

  it('creates a car', async () => {
    const result = await agent
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        query:
          'mutation { createCar(make: "Volkswagen", model: "Golf", year: 2004, vin: "JN1CV6FE5BM932021") { id make model year vin } }'
      });

    const { data } = JSON.parse(result.text);

    expect(result.statusCode).toBe(200);
    expect(data.createCar.make).toEqual(mockCarThree.make);
    expect(data.createCar.model).toEqual(mockCarThree.model);
    expect(data.createCar.year).toEqual(mockCarThree.year);
    expect(data.createCar.vin).toEqual(mockCarThree.vin);
  });

  it('updates a car', async () => {
    const result = await agent
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        query:
          'mutation { updateCar(id: "12345", make: "Volkswagen", model: "Golf R", year: 2004, vin: "JN1CV6FE5BM932021") { id make model year vin } }'
      });

    const { data } = JSON.parse(result.text);

    expect(result.statusCode).toBe(200);
    expect(data.updateCar.make).toEqual(mockCarThree.make);
    expect(data.updateCar.model).toEqual('Golf R');
    expect(data.updateCar.year).toEqual(mockCarThree.year);
    expect(data.updateCar.vin).toEqual(mockCarThree.vin);
  });

  it('deletes a car', async () => {
    const result = await agent
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        query: 'mutation { deleteCar(id: "12345") { id make model year vin } }'
      });

    const { data } = JSON.parse(result.text);

    expect(result.statusCode).toBe(200);
    expect(data.deleteCar).toBeNull();
  });
});
