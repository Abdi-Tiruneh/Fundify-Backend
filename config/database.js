const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || "5432",
  database: process.env.DB_NAME || "fundify",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "1313",
  dialect: "postgres",
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    // Sync the models to the database
    // await sequelize.sync();
    // console.log("Models synced to the database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

module.exports = {
  sequelize,
  connectToDatabase,
};
