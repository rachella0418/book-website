const express = require ('express');
const config = require('./config/config');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const dbConnection = require('./config/db');
const jwt = require('jsonwebtoken');

const app = express();
const port = config.port;

app.use(express.json);
dbConnection();

app.get('/', (req, res) => {
    res.send('<a href="main.html">Welcome</a>');
    console.log("Welcome");
});

app.get('/protected', (req,res) => {
    res.send('Hello');
})

app.listen(port, () => {
    console.log("http://localhost:3000");
})

app.use('/auth', require('./router'));