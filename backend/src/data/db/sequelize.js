const { Sequelize } = require("sequelize");
require("dotenv").config({ path: "../../config/.env" });

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  define: {
    freezeTableName: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

module.exports = sequelize;
