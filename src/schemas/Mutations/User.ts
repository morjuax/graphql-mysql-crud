import { GraphQLBoolean, GraphQLID, GraphQLString } from 'graphql';
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

export const DELETE_USER = {
  type: GraphQLBoolean,
  args: {
    id: {type: GraphQLID}
  },
  async resolve(_: any, {id}: any) {
    const result = await Users.delete(id)
    return result.affected
  }
}

export const UPDATE_USER = {
  type: GraphQLBoolean,
  args: {
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    userName: {type: GraphQLString},
    oldPassword: {type: GraphQLString},
    newPassword: {type: GraphQLString},
  },
  async resolve(_: any, {id, name, userName, oldPassword, newPassword}: any) {
    const userFound = await Users.findOne({
      where: {
        id
      }
    })

    if (!userFound) return false;

    const isMatch = await bcrypt.compare(oldPassword, userFound.password);
    if (!isMatch) return false;
    const newPasswordHashed = await bcrypt.hash(newPassword, 10);
    const result = await Users.update({id}, {name, userName, password: newPasswordHashed});
    return result.affected !== 0;

  }
}