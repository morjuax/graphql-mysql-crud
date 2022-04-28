import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLString } from 'graphql';
import { Users } from '../../entities/Users';
import { UserType } from '../../typeDefs/User';
import bcrypt from 'bcryptjs'
import { MessageType } from '../../typeDefs/Message';

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
  type: MessageType,
  args: {
    id: {type: GraphQLID},
    input: {
      type: new GraphQLInputObjectType({
        name: 'UserInput',
        fields: {
          name: {type: GraphQLString},
          userName: {type: GraphQLString},
          oldPassword: {type: GraphQLString},
          newPassword: {type: GraphQLString},
        }
      })

    }
  },
  async resolve(_: any, {id, input}: any) {
    const userFound = await Users.findOne({
      where: {
        id
      }
    })

    if (!userFound) {
      return  {
        success: false,
        message: 'Record no found'
      }
    }

    const isMatch = await bcrypt.compare(input.oldPassword, userFound.password);
    if (!isMatch) {
      return  {
        success: false,
        message: 'Old password is incorrect'
      }
    }
    const newPasswordHashed = await bcrypt.hash(input.newPassword, 10);
    const result = await Users.update({id}, {name: input.name, userName: input.userName, password: newPasswordHashed});

    return {
      success: result.affected,
      message: `Record updated`
    };

  }
}