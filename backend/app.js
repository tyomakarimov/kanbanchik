const express = require("express");
require("dotenv").config({ path: "src/config/.env" });
const sequelize = require("./src/data/db/sequelize");
const models = require("./src/data/models/models");

const app = express();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(process.env.PORT, () =>
      console.log(`Server started on port ${process.env.PORT}`)
    );
  } catch (e) {
    console.error(e);
  }
};

start();
