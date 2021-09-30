const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        //find the message in error
        const message = errors[Object.keys(errors)[1]][0]["msg"];
        //make new error with status code 500
        const error = new Error(message);
        error.statusCode = 500;
        //handle error in another function and go out
        return next(error);
        
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try{
        const hashedPassword = await bcrypt.hash(password, 12)
        const userDetails = {
            name: name,
            email: email,
            password: hashedPassword
        }
        const result = await User.save(userDetails);

        res.status(201).json({message: 'User registered!'});
    }
    catch (error) {
        //handle
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}