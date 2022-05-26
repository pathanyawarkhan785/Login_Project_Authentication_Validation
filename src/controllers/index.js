const { registerData } = require("../../db/query/index");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const homeRoute = async (ctx) => {
  ctx.body = "this is home router.";
};

const registerRoute = async (ctx) => {
  ctx.request.body = { ...ctx.request.body, _id: uuidv4() };
  const getData = await registerData(ctx.request.body);
  let message = "data not found";
  if (getData) {
    message = jwt.sign(
      { email: ctx.request.body.email },
      "1234567890123456789012345678901234567890"
    );
  }
  ctx.body = { msg: message };
  console.log(message);
};

const loginRoute = async (ctx) => {
  const { email } = ctx.state.shared;
  if (email) {
    const token = jwt.sign(
      { email },
      "1234567890123456789012345678901234567890"
    );
    ctx.body = { message: token };
  }
};

module.exports = {
  homeRoute,
  registerRoute,
  loginRoute,
};
