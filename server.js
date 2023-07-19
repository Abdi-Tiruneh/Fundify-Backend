const express = require("express");
require("dotenv").config();

const app = express();

require("./config/logging")();
require("./startup/config")();
require("./startup/routes")(app);
const { connectToDatabase } = require("./config/database");
connectToDatabase();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = server;
