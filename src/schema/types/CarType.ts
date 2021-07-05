import { GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql';

export const CarType = new GraphQLObjectType({
  name: 'Car',
  fields: () => ({
    id: { type: GraphQLString },
    make: { type: GraphQLString },
    model: { type: GraphQLString },
    vin: { type: GraphQLString },
    year: { type: GraphQLInt }
  })
});

export default CarType;
