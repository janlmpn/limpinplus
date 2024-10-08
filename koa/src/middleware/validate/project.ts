import Joi from 'joi';
import Koa from 'koa';

import { Project } from '../../model';

interface ProjectRequest {
  title: string;
  type: string;
  description: string;
  address: string;
}

const addProject = async (ctx: Koa.Context, next: Koa.Next) => {
  const params = ctx.request.body as ProjectRequest;
  const schema = Joi.object({
    title: Joi.string().required(),
    type: Joi.string(),
    description: Joi.string(),
    address: Joi.string(),
  }).validate(params);

  if (schema.error) {
    console.error(schema);
    ctx.throw(400, schema.error);
  }

  await next();
};

const updateProject = async (ctx: Koa.Context, next: Koa.Next) => {
  const params = ctx.request.body as ProjectRequest;
  const schema = Joi.object({
    title: Joi.string().required(),
    type: Joi.string(),
    description: Joi.string(),
    address: Joi.string(),
    _id: Joi.string()
  }).validate(params);
  if (schema.error) {
    console.error(schema);
    ctx.throw(400, schema.error);
  }

  await next();
};

export default {
  addProject,
  updateProject
};
