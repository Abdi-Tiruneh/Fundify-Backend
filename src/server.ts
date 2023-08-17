import express from "express";
import dotenv from "dotenv";

import logging from "./config/logging";
import jwtChecker from "./startup/jwtChecker";
import routes from "./startup/routes";
import { connectToDatabase } from "./config/database";
import { initializeCloudinary } from "./config/cloudinary";

dotenv.config();

const app = express();

logging();
initializeCloudinary();
jwtChecker();
routes(app);
connectToDatabase();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

export default server;
