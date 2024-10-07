import Koa from "koa";
import { router } from "./routes";

const app = new Koa();

const port = process.env.PORT || 3000;

app.use(router.routes());

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});