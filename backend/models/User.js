const sequelize = require("../db/sequelize");
const { DataTypes } = require("Sequelize");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(15),
    allowNull: false,
    is: /^\w{2,15}$/,
  },
  surname: {
    type: DataTypes.STRING(15),
    allowNull: false,
    is: /^\w{2,15}$/,
  },
  login: {
    type: DataTypes.STRING(15),
    allowNull: false,
    is: /^\w{2,15}$/,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    is: /^\w{,255}$/,
    unique: true,
  },
});

module.exports = User;
