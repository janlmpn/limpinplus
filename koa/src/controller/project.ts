import { Context } from 'koa';
import { Project } from '../model';

const filterFields = [];

const getProjects = async (ctx: Context) => {
  const projects = await Project.find({}, filterFields);
  ctx.body = projects;
};

const getProjectById = async (ctx: Context) => {
  const user = await Project.findById(ctx.params.userId, filterFields);
  ctx.body = user;
};


export default {
  getProjects,
  getProjectById
};
