const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey =process.env.JWT_SECRET;

async function registerUser(req,res){
    let {firstname, lastname, username, password} = req.body;
    try{
        const duplicate = await User.find({username});
        if(duplicate && duplicate.length >0){
            return res.status(400).send({message:'username already exists'});
        }
        let user = new User({firstname, lastname, username, password});
        const result = await user.save();
        console.log(result);

        res.status(201).send({message:'User Registered successfully! '});

    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
    
}

async function loginUser(req,res){
    try{
        const {username,password}= req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).send({message:'Authentication Failed'});
        }
        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(400).send({message:'Wrong password'});

        }
        let token = await jwt.sign({userId:user?._id},secretKey,{expiresIn:'1h'});
        let finalData = {
            userid:user?._id,
            username:user?.username,
            firstname:user?.firstname,
            lastname:user?.lastname,
            token
        }
        res.send(finalData);

    }catch(err){
        console.log(err);
        res.status(400).send(err)
    }

}

const AuthController = {
    registerUser,
    loginUser
}

module.exports = AuthController;