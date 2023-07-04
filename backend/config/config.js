const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port : process.env.PORT || 3000,
    mongodbUri: process.env.MONGODB_URI,
    mongodbPwd: process.env.MONGODB_PASSWORD,
    secretCode: process.env.JWT_SECRET_KEY,
}