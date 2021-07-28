const User = require("../models/User");
const Desk = require("../models/Desk");
const Task = require("../models/Task");
const Message = require("../models/Message");

const sequelize = require("../db/sequelize");

sequelize.sync({ force: true });
