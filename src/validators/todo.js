// const mongo = require("../../db/index");
const { findItem } = require("../../db/query/index");

const todoValid = async (ctx, next) => {
  try {
    // console.log("todo validation");
    const type = ctx.request.body.type;
    const data = ctx.request.body.data;
    const { email } = ctx.state.shared;

    if (!data && typeof data !== "string") {
      // ctx.throw(404, "data can't be null and must be in string format.");
      ctx.status = 400;
      ctx.body = "data can't be null and must be in string format.";
      return;
    }

    if (!(type === "food" || type === "fruit" || type === "others")) {
      // ctx.throw(400, "write correct type.");
      ctx.status = 400;
      ctx.body = "write correct type.";
      return;
    }

    // console.log(ctx.request.body.type);
    // console.log(ctx.request.body.data);

    const items = await findItem(type, data, email);

    if (items) {
      // ctx.throw(400, "data already exists.");
      ctx.status = 400;
      ctx.body = "data already exists.";
      return;
    }
    await next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = { todoValid };
