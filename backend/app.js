const sequelize = require("./db/sequelize");
//const User = require("./models/User");
//const Desk = require("./models/Desk");
const test = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

test();
