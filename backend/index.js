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
const { log } = require('console');
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public' + '/index.html'));
    console.log("Welcome");
});

app.post('/signup', async (req, res) => {
    console.log(req.body);
    try{
        const {username, password, name, avatar} = req.body;
        const oldUser = await User.findOne({username});
        if (oldUser){
            res.status(409).send("Username already existed");
        }

        const encryptedPwd = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: encryptedPwd,
            name,
            pwLength: password.length,
            avatar
        });

        const payload = {
            username: user.username,
            password: user.password,
            name: user.name,
            pwLength: user.pwLength
        }
        const token = jwt.sign(payload, secretCode, {expiresIn: '10h'});
        return res.cookie('token', token).json({success:true,message:'Signed Up Successfully'});
        //res.status(200).send("Sign up successfully!");
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
            return;
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
        return res.cookie('token', token).json({success:true,message:'Signed In Successfully'});
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
            return;
        }
        return res.json({user});
    }
    catch(error){
        if (error.name == 'TokenExpiredError'){
            res.status(404).send('Please login');
        }
        return res.json({error});
    }
});

app.post('/update', isAuthenticate, async (req, res) => {
    try{
        const user = req.user;
        const {currentPassword, newPassword, newUsername, newAvatar} = req.body;

        if (currentPassword && newPassword){
            const isCorrectPassword = await bcrypt.compare(currentPassword, user.password);

            if (!isCorrectPassword){
                res.status(400).send('Wrong current password');
                return;
            }

            const encryptedPwd = await bcrypt.hash(newPassword, 10);
            await User.findOneAndUpdate({username: user.username}, {
                password: encryptedPwd,
                pwLength: newPassword.length,
            });
            res.status(200).send('Change password successful');
            return;
        }

        if (newUsername){
            const isExistedUsername = await User.findOne({username: newUsername});

            if (!isExistedUsername){
                await User.findOneAndUpdate({username: user.username}, {username: newUsername});
                res.status(200).send('Change username successful');
                return;
            }
            else{
                res.status(400).send('Existed username');
                return;
            }
        }

        if (newAvatar){
            await User.findOneAndUpdate({username: user.username}, {avatar: newAvatar});
            res.status(200).send('Change avatar successful');
            return;
        }
    }
    catch(error){
        console.log({error});
        return res.json({error});
    }
});

app.put('/logout', isAuthenticate, (req, res) => {
    try{
        const user = req.user;
        const payload = {
            username: user.username,
            password: user.password,
        }

        const token = jwt.sign(payload, secretCode, {expiresIn: 1});
        return res.cookie('token', token).json({success:true,message:'Log out Successfully'});
    }
    catch(error){
        console.log({error});
        res.send(500).send('Logout unsuccessful');
    }
})

app.post('/addToLib', async(req, res) => {
    console.log(req.body);
    try {
        const {username, id, library} = req.body;

        if (library == "Read") {
            await User.findOneAndUpdate( 
                {username: username},
                {$addToSet: {haveRead: id}}
            )
            await User.findOneAndUpdate( 
                {username: username},
                {$pull: {currentlyReading: id}},
            )
            await User.findOneAndUpdate( 
                {username: username},
                {$pull: {toBeRead: id}},
            )
        } else if (library == "Currently Reading") {
            await User.findOneAndUpdate( 
                {username: username},
                {$addToSet: {currentlyReading: id}}
            )
            await User.findOneAndUpdate( 
                {username: username},
                {$pull: {haveRead: id}},
            )
            await User.findOneAndUpdate(
                {username: username},
                {$pull: {toBeRead: id}},
            )
        } else if (library == "To Be Read") {
            await User.findOneAndUpdate(
                {username: username},
                {$addToSet: {toBeRead: id}},
            )
            await User.findOneAndUpdate( 
                {username: username},
                {$pull: {haveRead: id}},
            )
            await User.findOneAndUpdate(
                {username: username},
                {$pull: {currentlyReading: id}},
            )
        }    
        res.status(200).send('Added to Library');
    }
    catch (error) {
        console.log({error});
        res.send(500).send("Error adding to library");
    }
});

app.get('/library', async(req, res) => {

})
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
