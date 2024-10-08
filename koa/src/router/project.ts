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
  .get('/:projectId', verifyToken(true), projectController.getProjectById);

export default router;
