const mongo = require("../index");
const bodyparser = require("koa-bodyparser");
const koa = require("koa");
const app = new koa();
app.use(bodyparser());

const registerData = async (data) =>
  await mongo.db("login").collection("userInfo").insertOne(data);

const insertTodo = async (data) => {
  await mongo.db("login").collection("todolist").insertOne(data);
};

const getsTodo = async () =>
  await mongo.db("login").collection("todolist").find().toArray();

const getTodo = async (_id) =>
  await mongo.db("login").collection("todolist").findOne({ _id });

const updateTodo = async (_id, data, type) =>
  await mongo
    .db("login")
    .collection("todolist")
    .updateOne({ _id }, { $set: { data, type } });

const deleteTodo = async (_id) =>
  await mongo.db("login").collection("todolist").deleteOne({ _id });

const findItem = async (type, data, email) =>
  await mongo.db("login").collection("todolist").findOne({ type, data, email });

module.exports = {
  registerData,
  insertTodo,
  deleteTodo,
  updateTodo,
  getTodo,
  getsTodo,
  findItem,
};
