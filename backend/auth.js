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
        return next(error);
    }
}

module.exports = isAuthenticate;