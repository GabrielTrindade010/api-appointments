const Sequelize = require("sequelize");
require("dotenv").config({ path: "../.env" });

const requiredEnv = ["DB_HOST","DB_PORT","DB_DATABASE","DB_USER","DB_PASS"];

requiredEnv.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`Missing environment variable: ${env}`);
  }
});

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS,
{
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    connectTimeout: 10000
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

module.exports = sequelize;