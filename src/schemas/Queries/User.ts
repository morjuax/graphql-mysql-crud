import { Users } from '../../entities/Users';
import { UserType } from '../../typeDefs/User';
import { GraphQLList } from 'graphql';

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  async resolve() {
    return await Users.find();
  }
}