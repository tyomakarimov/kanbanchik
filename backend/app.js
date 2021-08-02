require('dotenv').config({ path: '.env' });
const express = require('express');
const cors = require('cors');
const router = require('./src/routes/router');
const sequelize = require('./src/data/db/sequelize');
const models = require('./src/data/models/models');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
  } catch (e) {
    console.error(e);
  }
};

start();
