import * as Koa from "koa";
import * as Router from "koa-router";

import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new Router();

interface HelloRequest {
  name: string;
}

router.post("/", async (ctx, next) => {
  const { name } = ctx.request.body as HelloRequest;
  ctx.body = { name };
  await next();
});


router.get("/", async (ctx, next) => {
  ctx.body = 'Hello world!!';
  await next();
});

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 3001, () => {
  console.log("Koa started");
});