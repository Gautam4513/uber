const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const blackListTokenModel = require('../models/blackListToken.model')

module.exports.authUser = async (req , res, next)=>{
    const token =req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log(token)
    if(!token){
        res.status(401).json({
            message:'Unauthorized'
        })
    }
const isBlackListed = await blackListTokenModel.findOne({token});

if(isBlackListed){
    return res.status(401).json({
        message:"Unauthorized"
    })
}
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user =await userModel.findById(decoded._id)

        req.user = user

        return next()
    }catch(err){
        res.status(401).json({
            message:'Unauthorized'
        })
    }
}