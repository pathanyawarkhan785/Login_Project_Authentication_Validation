const koaRouter = require("koa-router");
const routerTodo = new koaRouter();
const auth = require("../middlewares/auth");
const { todoValid } = require("../validators/todo");
const {
  todoCreatecont,
  viewTodo,
  todoUpdate,
  listTodo,
  todoDelete,
} = require("../controllers/todo");

routerTodo.post("/todo/create", auth, todoValid, todoCreatecont);

routerTodo.get("/todo/list", auth, listTodo);

routerTodo.get("/todo/view/:_id", auth, viewTodo);

routerTodo.patch("/todo/update/:_id", auth, todoUpdate);

routerTodo.delete("/todo/delete/:_id", auth, todoDelete);

// list create view delete update

module.exports = routerTodo;
