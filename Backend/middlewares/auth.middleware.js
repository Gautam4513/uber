const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const blackListTokenModel = require('../models/blackListToken.model')
const captainModel = require('../models/captain.model')

module.exports.authUser = async (req , res, next)=>{
    const token =req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log(token)
    if(!token){
       return res.status(400).json({
            message:'Unauthorized 12'
        })
    }
const isBlackListed = await blackListTokenModel.findOne({token});

if(isBlackListed){
    return res.status(400).json({
        message:"Unauthorized 19"
    })
}
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user =await userModel.findById(decoded._id)

        req.user = user
        // console.log(user)
        if(!user){
            return res.status(400).json({
                message:'Unauthorized 29'
            })
        }

        return next()
    }catch(err){
        res.status(401).json({
            message:'Unauthorized 31'
        })
    }
}

module.exports.authCaptain = async (req , res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    console.log(token)
    if(!token){
        return res.status(400).json({
            message:'Unauthorized'
        })
    }

    const isBlacklisted = await blackListTokenModel.findOne({token})

    if(isBlacklisted){
        return res.status(400).json({
            message:'Unauthorized'
        })
    }

    try{
        const decoded =jwt.verify(token,process.env.JWT_SECRET)
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain
        console.log(captain)
        if(!captain){
            return res.status(400).json({
                message:'Unauthorized 29'
            })
        }
        return next()
        
    }catch(err){
        res.status(401).json({
            message:'Unauthorized'
        })
    }

}