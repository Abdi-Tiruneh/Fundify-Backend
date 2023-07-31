import express, { Application } from "express";
import errorHandler from "../middleware/errorHandler";
import users from "../routers/userRoutes";
import auth from "../routers/authRoutes";
import campaignTypes from "../routers/campaignTypeRoutes";

export default function setupRoutes(app: Application): void {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/campaignTypes", campaignTypes);
  app.use(errorHandler);
}
