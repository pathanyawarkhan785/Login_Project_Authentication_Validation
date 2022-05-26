const mongo = require("../../db/index");

const registerVal = async (ctx, next) => {
  // console.log("val");
  try {
    const name = ctx.request.body.name;
    const age = ctx.request.body.age;
    const email = ctx.request.body.email;
    const mobileno = ctx.request.body.mobileno;
    const regexEmail =
      /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    const regexMobileno = /^[6-9]\d{9}$/gi;
    const password = ctx.request.body.password;
    // console.log(typeof name.length);
    // console.log(typeof mobileno.length, mobileno);
    // console.log(typeof age);

    if (name === undefined || name.length === 0 || name.trim().length === 0) {
      ctx.status = 400;
      ctx.body = "name is compulsory & not null.";
      return;
      // ctx.throw("name is compulsory.");
    } else if (typeof name !== "string") {
      ctx.status = 400;
      ctx.body = "name must be a string.";
      // ctx.throw("name must be a string.");
      return;
    }

    // if (age) {
    if (typeof age !== "number" || age.length === 0) {
      ctx.status = 400;
      ctx.body = "age must be in a number format & not null.";
      // ctx.throw(400, "age must be in a number format.");
      return;
    }
    // }

    const findEmail = await mongo
      .db("login")
      .collection("userInfo")
      .findOne({ email });
    // console.log(findEmail);

    if (findEmail) {
      // ctx.throw(400, "email exists");
      ctx.status = 400;
      ctx.body = "email exists.";
      return;
    } else {
      if (email === undefined) {
        ctx.status = 400;
        ctx.body = "email is compulsory.";
        // ctx.throw(400, "email is compulsory.");
        return;
      } else if (typeof email !== "string") {
        ctx.status = 400;
        ctx.body = "email must be in a string format.";
        return;
        // ctx.throw(400, "email must be in a string format.");
      } else if (regexEmail.test(email) === false) {
        ctx.status = 400;
        ctx.body = "type email in correct format.";
        return;
        // ctx.throw(400, "type email in correct format.");
      }
    }

    const findMobileno = await mongo
      .db("login")
      .collection("userInfo")
      .findOne({ mobileno });

    if (findMobileno) {
      ctx.status = 400;
      ctx.body = "mobileno exists.";
      return;
      // ctx.throw(400, "mobileno exists");
    } else {
      // if (mobileno) {
      if (
        typeof mobileno !== "string" ||
        mobileno.length === 0 ||
        mobileno.trim().length === 0
      ) {
        ctx.status = 400;
        ctx.body = "mobile number must be in a string format & not null.";
        return;
        // ctx.throw("mobile number must be in a string format.");
      } else if (regexMobileno.test(mobileno) === false) {
        ctx.status = 400;
        ctx.body = "type mobile number in correct format.";
        return;
        // ctx.throw("type mobile number in correct format.");
      }
      // }
    }

    if (password === undefined) {
      ctx.status = 400;
      ctx.body = "password is compulsory.";
      return;
      // ctx.throw("password is compulsory.");
    } else if (typeof password !== "string") {
      ctx.status = 400;
      ctx.body = "passsword must be in a string format.";
      return;
      // ctx.throw("passsword must be in a string format.");
    } else if (password.length !== 5) {
      ctx.status = 400;
      ctx.body = "password must be 5 character long.";
      return;
    }

    await next();
  } catch (e) {
    ctx.body = e;
    console.log(e);
  }
};

const loginVal = async (ctx, next) => {
  try {
    const { email, password, mobileno } = ctx.request.body;
    if (!((email && email.trim()) || (mobileno && mobileno.trim()))) {
      ctx.status = 400;
      ctx.body = "user not found.";
      return;
      // ctx.throw(404, "user not found");
    }

    const emailData = await mongo
      .db("login")
      .collection("userInfo")
      .findOne({ email });

    if (emailData) {
      if (emailData.password !== password) {
        ctx.status = 401;
        ctx.body = "password not matching.";
        return;
        // ctx.throw(401, "password not matching.");
      }
    } else if (mobileno) {
      let emailVal = "";
      const mobileData = await mongo
        .db("login")
        .collection("userInfo")
        .findOne({ mobileno });

      if (mobileData) {
        emailVal = mobileData.email;
        if (emailVal) {
          if (mobileData.password !== password) {
            // ctx.throw(401, "password not matching.");
            ctx.status = 401;
            ctx.body = "password not matching";
            return;
          }
        }
      }
    } else {
      // ctx.throw(404, "no user found with email or mobileno.");
      ctx.status = 400;
      ctx.body = "no user found with email or mobileno.";
      return;
    }
    ctx.state.shared = {
      email,
    };
    await next();
  } catch (e) {
    ctx.body = e;
    console.log(e);
  }
};

module.exports = { registerVal, loginVal };
