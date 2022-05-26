const koaRouter = require("koa-router");
const router = new koaRouter();

const {
  homeRoute,
  registerRoute,
  loginRoute,
} = require("../controllers/index");

const { registerVal, loginVal } = require("../validators/index");

router.get("/", homeRoute);

router.post("/register", registerVal, registerRoute);

router.post("/login", loginVal, loginRoute);

module.exports = router;
