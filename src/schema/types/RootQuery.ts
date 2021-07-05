import { GraphQLList, GraphQLString, GraphQLObjectType } from 'graphql';
import { CarDao } from '@src/daos';
import { CarType } from './CarType';

const carDao = new CarDao();

export const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllCars: {
      type: new GraphQLList(CarType),
      resolve: async () => {
        const result = await carDao.getCars();
        return result;
      }
    },
    getCarById: {
      type: CarType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: async (_, args) => {
        const result = await carDao.getCar(args.id);
        return result;
      }
    },
    getCarsByMakeAndModel: {
      type: new GraphQLList(CarType),
      args: {
        make: { type: GraphQLString },
        model: { type: GraphQLString }
      },
      resolve: async (_, args) => {
        const result = await carDao.getCarsByMakeAndModel(args.make, args.model);
        return result;
      }
    }
  }
});

export default RootQuery;
