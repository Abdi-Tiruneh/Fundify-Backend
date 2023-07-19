const express = require("express");
const users = require("../routers/userRoutes");
const auth = require("../routers/authRoutes");
const errorHandler = require("../middleware/errorHandler");
module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(errorHandler);
};
