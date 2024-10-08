import Koa from "koa";
import cors from '@koa/cors';
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import router from './router';

const app = new Koa();
app.use(cors());

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.on('error', (err) => {
  console.error(JSON.stringify(err));
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Koa started");
});