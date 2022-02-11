const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const admin = require('./routes/admin');
app.use('/store/admin', admin);

const customer = require('./routes/customer');
app.use('/store/customer', customer);

const product = require('./routes/product');
app.use('/store/product', product);

app.listen(8080, () => {
    console.log('server run on port 8080');
})