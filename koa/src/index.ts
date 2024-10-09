import Koa from "koa";
import cors from '@koa/cors';
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import importedRouter from './router';
import Router from 'koa-router';

const app = new Koa();
app.use(cors());

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
    console.error('Error - ', err.message)
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
  }
})

// Routes
const router = new Router();
router
  .get('/', async (ctx, next) => {
    ctx.body = { message: 'Hello, World!' };  
  });

app.use(router.routes()).use(importedRouter.routes()).use(importedRouter.allowedMethods());

app.listen(process.env.PORT || 3001, () => {
  console.log("Koa started");
});