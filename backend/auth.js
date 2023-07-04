const user = require('./model/userModel')

exports.signup = async (req, res, next) => {
    const {email, username, password} = req.body;
    console.log({email, username, password});
    try{
        await user.create({
            email,
            username,
            password,
        })
        res.status(200).json({
            message: "Sign up successful!",
            user,
        })
    } catch (error){
        res.status(401).json({
            message: "Sign up failed!",
            error: error.message,
        })
    }
}