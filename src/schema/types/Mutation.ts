import { GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql';
import { CarDao } from '@src/daos';
import { ICar } from '@src/models';
import { CarType } from './CarType';

const carDao = new CarDao();

const commonArgs = {
  make: { type: GraphQLString },
  model: { type: GraphQLString },
  year: { type: GraphQLInt },
  vin: { type: GraphQLString }
};

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createCar: {
      type: CarType,
      args: { ...commonArgs },
      resolve: async (_, args) => {
        const result = await carDao.createCar(args as ICar);
        return result;
      }
    },
    updateCar: {
      type: CarType,
      args: {
        ...commonArgs,
        id: { type: GraphQLString }
      },
      resolve: async (_, args) => {
        const { id, ...rest } = args;
        const result = await carDao.updateCar(id, { ...(rest as ICar) });
        return result;
      }
    },
    deleteCar: {
      type: CarType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: async (_, args) => {
        const result = await carDao.deleteCar(args.id);
        return result;
      }
    }
  }
});

export default Mutation;
