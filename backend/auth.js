const config = require('./config/config');
const jwt = require('jsonwebtoken');
const User = require('./model/userModel');

const isAuthenticate = async (req, res, next) => {
    try{
        const {token} = req.cookies;
        
        if (!token){
            return next('Please login');
        }
    
        const user = jwt.verify(token, config.secretCode);
        req.user = await User.findOne({username: user.username});
        next();
    }
    catch(error){
        if (error.name == 'TokenExpiredError'){
            res.status(404).send('Please login');
            return;
        }
        return next(error);
    }
}

module.exports = isAuthenticate;