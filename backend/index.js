const express = require ('express');
const config = require('./config/config');
const bcrypt = require('bcrypt');
const dbConnection = require('./config/db');
const jwt = require('jsonwebtoken');
const User = require('./model/userModel');
const isAuthenticate = require('./auth');
const cookieParser = require('cookie-parser');

const app = express();
const port = config.port;
const secretCode = config.secretCode;

app.use(cookieParser());
app.use(express.json());
dbConnection();
var path = require('path');
const userModel = require('./model/userModel');
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public' + '/index.html'));
    console.log("Welcome");
});

app.post('/signup', async (req, res) => {
    console.log(req.body);
    try{
        const {username, password} = req.body;
        const oldUser = await User.findOne({username});
        if (oldUser){
            res.status(409).send("Username already existed");
            return;
        }

        const encryptedPwd = await bcrypt.hash(password, 10);
        await User.create({
            username,
            password: encryptedPwd,
        });
        res.status(200).send("Sign up successfully!");
    }
    catch(error){
        res.status(500).send("Sign up failed");
        console.log({error});
    }
})

app.post('/signin', async (req, res) => {
    try{
        const {username, password} = req.body;

        if (!username || !password){
            res.status(400).send("Username and password required");
            console.log("username required");
        }

        const user = await User.findOne({username});
        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword){
            res.status(400).send("Incorrect Password");
            return;
        }

        const payload = {
            username: user.username,
            password: user.password,
        }

        const token = jwt.sign(payload, secretCode, {expiresIn: '10h'});
        return res.cookie('token', token).json({success:true,message:'LoggedIn Successfully'});
    }
    catch(error){
        console.log({error});
        res.status(500).send("Logged In failed!");
    }

})

app.get('/user', isAuthenticate, async (req, res) => {
    try{
        const user = req.user;
        if (!user){
            res.status(404).send('No user found');
        }
        return res.json({user});
    }
    catch(error){
        return res.json({error});
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
