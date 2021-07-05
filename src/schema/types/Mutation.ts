import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { CarDao } from '@src/daos';
import { ICar } from '@src/models';
import { CarType } from './CarType';

const carDao = new CarDao();

const commonArgs = {
  make: { type: GraphQLNonNull(GraphQLString) },
  model: { type: GraphQLNonNull(GraphQLString) },
  year: { type: GraphQLNonNull(GraphQLInt) },
  vin: { type: GraphQLNonNull(GraphQLString) }
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
        id: { type: GraphQLNonNull(GraphQLString) }
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
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, args) => {
        const result = await carDao.deleteCar(args.id);
        return result;
      }
    }
  }
});

export default Mutation;
