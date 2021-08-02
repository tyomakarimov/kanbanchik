require('dotenv').config({ path: 'src/config/.env' });
const express = require('express');
const router = require('./src/routes/router');
const sequelize = require('./src/data/db/sequelize');
const models = require('./src/data/models/models');

const app = express();

app.use(express.json());
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
