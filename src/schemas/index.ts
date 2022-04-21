import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { GREETING } from './Queries/Greeting';
import { CREATE_USER } from './Mutations/User';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    greeting: GREETING
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: CREATE_USER
  }
})

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})