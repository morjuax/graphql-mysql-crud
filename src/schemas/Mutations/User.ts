import { GraphQLString } from 'graphql';
import { Users } from '../../entities/Users';
import { UserType } from '../../typeDefs/User';
import bcrypt from 'bcryptjs'

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    userName: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(_: any, args: any) {
    const {name, userName, password} = args;

    const encryptPassword = await bcrypt.hash(password, 10)
    const result = await Users.insert({
      name,
      userName,
      password: encryptPassword
    });

    return {
      ...args,
      id: result.identifiers[0].id,
      password: encryptPassword
    }
  }
}