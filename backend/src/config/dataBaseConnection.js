const { Sequelize } = require("sequelize");
require("dotenv").config({ path: "../../.env" });

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: require("mysql2"),
  }
);

const authenticateDataBase = async () => {
  try {
    await sequelize.authenticate();
    console.log("CONNECTED TO DATABASE");
  } catch (error) {
    console.log("ERROR! FAILED TO CONNECT TO DATABASE: ", error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  authenticateDataBase,
};
