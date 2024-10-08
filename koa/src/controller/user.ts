import { Context } from 'koa';
import { User } from '../model';
import { createToken } from '../utils/jwt';

const filterFields = ['-password', '-phone', '-email'];

const getUsers = async (ctx: Context) => {
  const users = await User.find({}, filterFields);
  ctx.body = users;
};

const getUserById = async (ctx: Context) => {
  const user = await User.findById(ctx.params.userId, filterFields);
  ctx.body = user;
};

const register = async (ctx: Context) => {
  const userModel = new User(ctx.request.body);
  const rsp = (await userModel.save()).toJSON();
  delete (rsp as Partial<typeof rsp>).password;
  ctx.body = rsp;
};

const login = async (ctx: Context) => {
  const rsp = await User.findOne(ctx.request.body, filterFields);
  if (!rsp) {
    ctx.throw(400, 'User not found');
  }
  const rspJson = rsp.toJSON();
  const token = await createToken(rspJson).catch((err) => {
    ctx.throw(500, err);
  });
  ctx.body = {
    ...rspJson,
    token
  };
};

export default {
  getUsers,
  register,
  login,
  getUserById
};
