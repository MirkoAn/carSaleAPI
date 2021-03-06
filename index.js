require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const car = require('./routes/car');
const user = require('./routes/user');
const company = require('./routes/company');
const sale = require('./routes/sale');
const auth = require('./routes/auth');
app.use(express.json());
app.use('/api/cars', car);
app.use('/api/users', user);
app.use('/api/company', company);
app.use('/api/sale', sale);
app.use('/api/auth', auth);
const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Escuchando en el puerto: ${port}`))
mongoose.connect('mongodb://localhost/carsdb', {useNewUrlParser: true, useFindAndModify:false, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(error => console.error('Unable to connect to MongoDB, try again'))