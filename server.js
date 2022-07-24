require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', error => console.log(error));

db.once('open', () => console.log('Successfully connected to database!'));

const bookRoute = require('./routes/books');

app.use('/books', bookRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is conncted to port: ${port}`);
});