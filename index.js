const koa = require("koa");
const bodyparser = require("koa-bodyparser");
const router = require("./src/routers/routes");
const routerTodo = require("./src/routers/todo");
const port = 8000;

const app = new koa();

app.use(bodyparser());
app.use(router.routes()).use(router.allowedMethods());
app.use(routerTodo.routes()).use(routerTodo.allowedMethods());

app.listen(port, () => {
  console.log(`listening to port no. ${port}`);
});
