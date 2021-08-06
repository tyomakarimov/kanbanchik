const sequelize = require('../db/sequelize');
const { DataTypes } = require('Sequelize');

const User = sequelize.define('User', {
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
    is: /^[A-Za-z0-9\$&+,:;=?@#|'<>.^*()%!-]{, 255}$/,
    unique: true,
  },
});

const Desk = sequelize.define('Desk', {
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

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM({
      values: ['to do', 'in a process', 'done'],
    }),
  },
});

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
  },
});

const Token = sequelize.define('Token', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  key: {
    type: DataTypes.STRING(300),
    unique: true,
  },
});

User.hasMany(Desk, {
  foreigKey: 'user_id',
});
Desk.belongsTo(User, {
  foreignkey: 'user_id',
});

User.hasOne(Token, {
  foreignKey: 'user_id',
});
Token.belongsTo(Token, {
  foreignKey: 'user_id',
});

Desk.hasMany(Task, { foreignKey: 'desk_id' });
Task.belongsTo(Desk, { foreignKey: 'desk_id' });

User.belongsToMany(Task, { through: 'user-task', foreignKey: 'user_id' });
Task.belongsToMany(User, { through: 'user-task', foreignKey: 'task_id' });

User.hasMany(Message, {
  foreignkey: 'user_id',
});
Message.belongsTo(User, {
  foreignkey: 'user_id',
});

Task.hasMany(Message, {
  foreignkey: 'task_id',
});
Message.belongsTo(Task, {
  foreignkey: 'task_id',
});

module.exports = {
  User,
  Desk,
  Token,
  Task,
  Message,
};
