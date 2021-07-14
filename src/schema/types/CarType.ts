import { GraphQLInt, GraphQLNonNull, GraphQLString, GraphQLObjectType } from 'graphql';

export const CarType = new GraphQLObjectType({
  name: 'Car',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    make: { type: GraphQLNonNull(GraphQLString) },
    model: { type: GraphQLNonNull(GraphQLString) },
    year: { type: GraphQLNonNull(GraphQLInt) },
    vin: { type: GraphQLNonNull(GraphQLString) }
  })
});

export default CarType;
