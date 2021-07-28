const sequelize = require("../db/sequelize");
const { DataTypes } = require("Sequelize");
const Desk = require("./Desk");
const User = require("./User");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM({
      values: ["to do", "in a process", "done"],
    }),
  },
});

User.belongsToMany(Task, { through: "user-task", foreignKey: "user_id" });
Task.belongsToMany(User, { through: "user-task", foreignKey: "task_id" });

module.exports = Task;
