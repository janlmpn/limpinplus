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

const addProject = async (ctx: Context) => {
  const userModel = new Project(ctx.request.body);
  const rsp = (await userModel.save()).toJSON();
  ctx.body = rsp;
};


export default {
  getProjects,
  getProjectById,
  addProject
};
