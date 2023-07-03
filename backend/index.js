const express = require ('express');
const config = require('./config');

const app = express();
const port = config.port;

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