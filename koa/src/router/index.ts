import Router from "koa-router";
import { userController } from '../controller';
import { userValidate } from '../middleware';
import { verifyToken } from '../utils/jwt';
import project from "./project";

const router = new Router({
  prefix: '/api/v1'
});

router
  .get('/users', verifyToken(true), userController.getUsers)
  .post('/users/register', userValidate.register, userController.register)
  .get('/users/:userId', verifyToken(true), userController.getUserById)
  .post('/users/login', verifyToken(false), userValidate.login, userController.login);

router.use('/projects', project.routes())

export default router;
