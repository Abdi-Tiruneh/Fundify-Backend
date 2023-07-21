import { Application } from "express";
import cors, { CorsOptions } from "cors";

module.exports = function (app: Application) {
  // TODO: Update the CORS settings according to your specific use case
  const corsOptions: CorsOptions = {
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    credentials: true,
  };

  // Enable CORS for all routes
  app.use(cors(corsOptions));
};
