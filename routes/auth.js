//validation is here, when the users sends data from frontend
const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user.js');
const authController = require('../controllers/auth');

const router = express.Router();

//if it is post request with signup folder
router.post(
    '/signup', 
    [
        body('name').trim().not().isEmpty(),
        body('email').isEmail().withMessage('Please enter a valid email!').custom(async (email) => {
            const user = await User.find(email);
            try{
                if(user[Object.keys(user)[0]][0]["email"]){
                    //email already exists here we jump direct in authCOntroller.signup
                    return Promise.reject('Email adress already exists');
                }
            }catch(err){
                //do nothing
            } 
        }),
        body('password').trim().isLength({min: 7})
    ], authController.signup
);

//export router object
module.exports = router;


//тут нужно написать тоже самое для login
