import Router from 'koa-router';
import { projectController } from '../controller';
import { projectValidate } from '../middleware';
import { verifyToken } from '../utils/jwt';

const router = new Router();

router
  .get('/', verifyToken(true), projectController.getProjects)
  .post(
    '/create',
    verifyToken(true),
    projectValidate.addProject,
    projectController.addProject
  )
  .get('/:projectId', verifyToken(true), projectController.getProjectById)
  .put(
    '/:projectId', 
    verifyToken(true), 
    projectValidate.updateProject,
    projectController.updateProject
  ).del('/:projectId', verifyToken(true), projectController.deleteProject);

export default router;
