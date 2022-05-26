const jwt = require("jsonwebtoken");
const auth = async (ctx, next) => {
  // console.log("ywr");
  try {
    // console.log(ctx.headers);
    // console.log(ctx.headers.authorization);
    // console.log("Authorization");
    let token = ctx.headers.authorization;
    token = token.split(" ");
    const verify = jwt.verify(
      token[0],
      "1234567890123456789012345678901234567890"
    );
    // ctx.body = verify.email;
    // console.log(verify.email);
    ctx.state.shared = { email: verify.email };

    await next();
  } catch (e) {
    ctx.body = e;
    console.log(e);
  }
};

module.exports = auth;
