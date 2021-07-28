const sequelize = require("../db/sequelize");
const { DataTypes } = require("Sequelize");
const User = require("./User");
const Task = require("./Task");

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
  },
});

User.hasMany(Message, {
  foreignkey: "user_id",
});
Message.belongsTo(User, {
  foreignkey: "user_id",
});

Task.hasMany(Message, {
  foreignkey: "user_id",
});
Message.belongsTo(Task, {
  foreignkey: "user_id",
});

module.exports = Message;
