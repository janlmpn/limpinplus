import Joi from 'joi';
import Koa from 'koa';

import { User } from '../../model';

interface UserRequest {
  email: string;
  phone: string;
  username: string;
}

const register = async (ctx: Koa.Context, next: Koa.Next) => {
  const params = ctx.request.body as UserRequest;
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    phone: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(20).required(),
  }).validate(params);
  if (schema.error) {
    console.error(schema);
    ctx.throw(400, schema.error);
  }

  const emailValidate = await User.findOne({ email: params.email });
  if (emailValidate) {
    ctx.throw(400, 'Email already existing');
  }

  const phoneValidate = await User.findOne({ phone: params.phone });
  if (phoneValidate) {
    ctx.throw(400, 'Phone already existing');
  }
  const usernameValidate = await User.findOne({ username: params.username });
  if (usernameValidate) {
    ctx.throw(400, 'Username already existing');
  }
  await next();
};

const login = async (ctx: Koa.Context, next: Koa.Next) => {
  const params = ctx.request.body as UserRequest;
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(20).required(),
  }).validate(params);
  if (schema.error) {
    console.error(schema);
    ctx.throw(400, schema.error);
  }
  const usernameValidate = await User.findOne({ username: params.username });
  if (!usernameValidate) {
    ctx.throw(400, 'User not found');
  }
  await next();
};

export default {
  register,
  login,
};
