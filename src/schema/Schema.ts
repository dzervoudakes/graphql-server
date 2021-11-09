import { GraphQLSchema } from 'graphql';

import { Mutation, RootQuery } from './types';

export const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

export default Schema;
