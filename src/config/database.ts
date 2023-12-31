import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: process.env.DB_NAME || "fundify",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "1313",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 5432,
  dialect: "postgres",
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    console.log("Models synced to the database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

export { sequelize, connectToDatabase };
