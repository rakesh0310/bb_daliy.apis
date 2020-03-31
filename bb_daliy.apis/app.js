const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: process.env.DOTENV_PATH });
const port = process.env.PORT;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

require('./database/connection')
  .authenticate()
  .then(() => console.log('Connected'));

app.use('/customers', require('./routes/customers'));
app.use('/products', require('./routes/products'));
app.use('/localities', require('./routes/localities'));
app.use('/subscriptions', require('./routes/subscriptions'));

app.listen(port, () => {
  console.log(`server running on the ${port}`);
});
