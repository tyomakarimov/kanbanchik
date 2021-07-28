const sequelize = require("../db/sequelize");
const { DataTypes } = require("Sequelize");
const User = require("./User");

const Desk = sequelize.define("Desk", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(25),
    allowNull: false,
    is: /^\w{2,25}$/,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    is: /^\w{,255}$/,
    unique: true,
  },
});

User.hasMany(Desk, {
  foreignkey: "user_id",
});
Desk.belongsTo(User, {
  foreignkey: "user_id",
});

module.exports = Desk;
