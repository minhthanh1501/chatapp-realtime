const { notFound, errHandler } = require("../middlewares/errHandler");
const userRouter = require("./UserRouter");

const initRoutes = (app) => {
  app.use("/api/user/", userRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
