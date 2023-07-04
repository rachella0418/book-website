const config = require('./config');
const mongoose = require('mongoose');

const url = config.mongodbUri;

const dbConnection = async() => {
    try {
        const connectDb = await mongoose.connect(url);
        if (connectDb){
            console.log("db connected");
        }
        else{
            console.log({error});
        }
    }
    catch (error){
        console.log(`error: ${error}`);
    }
}

module.exports = dbConnection;