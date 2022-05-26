const { v4: uuidv4 } = require("uuid");
const {
  insertTodo,
  getsTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  // findData,
  findItem,
} = require("../../db/query/index");

// console.log(`uuid4 : ${uuidv4()}`);
// console.log(typeof uuidv4);

const todoCreatecont = async (ctx) => {
  const { email } = ctx.state.shared;
  ctx.request.body = {
    ...ctx.request.body,
    _id: uuidv4(),
    email,
  };
  const data = await insertTodo(ctx.request.body);
  // console.log(`data : ${data}`);
  ctx.body = "data inserted successfully.";
  ctx.body = data;
};

const viewTodo = async (ctx) => {
  // console.log("viewtodo");

  // console.log(uuidv4());
  const _id = ctx.params._id;
  const data = await getTodo(_id);
  // console.log(data);
  ctx.body = data;
};

const listTodo = async (ctx) => {
  // console.log("list todo");
  const data = await getsTodo();
  // console.log(data);
  ctx.body = data;
};

const todoUpdate = async (ctx) => {
  const _id = ctx.params._id;
  const type = ctx.request.body.type;
  const data = ctx.request.body.data;
  const { email } = ctx.state.shared;
  // console.log(_id);
  const findres = await findItem(type, data, email);
  // console.log((ctx.request.body = { ...ctx.request.body, email }));
  // console.log(findres);
  // ctx.body = findres;
  // console.log(findres.type, findres.data);
  // console.log(findres);
  if (findres) {
    if (
      findres.type === ctx.request.body.type &&
      findres.data === ctx.request.body.data
    ) {
      ctx.status = 400;
      ctx.body = "nothing changed.";
      return;
    } else if (findres !== null) {
      ctx.status = 400;
      ctx.body = "data or type already exists.";
      return;
    }
  }

  const updateData = await updateTodo(_id, data, type);
  // console.log(getData);
  ctx.body = { msg: "updated successfully", response: _id };
};

const todoDelete = async (ctx) => {
  const _id = ctx.params._id;
  // console.log(_id);
  const data = await deleteTodo(_id);
  // console.log(data);
  ctx.body = data;
};

module.exports = { todoCreatecont, viewTodo, todoUpdate, listTodo, todoDelete };
