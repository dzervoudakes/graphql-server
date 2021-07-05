import { GraphQLSchema } from 'graphql';
import { RootQuery } from './types';

// @todo mutation

export const Schema = new GraphQLSchema({ query: RootQuery });

export default Schema;
