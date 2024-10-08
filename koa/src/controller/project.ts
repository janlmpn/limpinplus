import { Context } from 'koa';
import { Project } from '../model';
import mongoose from 'mongoose';

const filterFields = [];

const getProjects = async (ctx: Context) => {
  const { q } = ctx.query;
  const projects = await Project.find( !!q ? {
    $or: [
      { title: { $regex: q, $options: 'i' } },
      { type: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { address: { $regex: q, $options: 'i' } },
    ],
  } : {}, filterFields);
  ctx.body = projects;
};


const getProjectById = async (ctx: Context) => {
  const project = 
    mongoose.isValidObjectId(ctx.params.projectId) && 
    await Project.findById(ctx.params.projectId, filterFields);
  
  if(!project){
    ctx.throw(400, 'Project not found');
  }

  ctx.body = project;
  
};
const addProject = async (ctx: Context) => {
  const projectModel = new Project(ctx.request.body);
  const rsp = (await projectModel.save()).toJSON();
  ctx.body = rsp;
};

const updateProject = async (ctx: Context) => {

  if(!mongoose.isValidObjectId(ctx.params.projectId)){
    ctx.throw(400, 'Project not found');
  }
  
  const project = await Project.findOneAndUpdate(
    {
      _id: ctx.params.projectId
    },
    new Project(ctx.request.body, {
      toJSON: { 
        transform: function(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
        }
      }
    }),
    {
      new: true
    }
  );

  if(!project){
    ctx.throw(400, 'Project not found');
  }

  ctx.body = project;
};

const deleteProject = async (ctx: Context) => {

  if(!mongoose.isValidObjectId(ctx.params.projectId)){
    ctx.throw(400, 'Project not found');
  }

  const project = await Project.findOneAndDelete(
    {
      _id: ctx.params.projectId
    }
  );

  if(!project){
    ctx.throw(400, 'Project not found');
  }

  ctx.body = project;
};


export default {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject
};
