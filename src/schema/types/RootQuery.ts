import { GraphQLList, GraphQLObjectType } from 'graphql';
import { CarType } from './CarType';
import { CarDao } from '../../daos';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllCars: {
      type: new GraphQLList(CarType),
      resolve: async () => {
        const carDao = new CarDao();
        const result = await carDao.getCars();
        return result;
      }
    }
    // getCar: {
    //   type: new GraphQLObjectType(CarType)
    // }
  }
});

export default RootQuery;
