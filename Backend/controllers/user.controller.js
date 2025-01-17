const userModel = require('../models/user.model')
const userServices = require('../Services/user.services')
const {validationResult} = require('express-validator')
const blackListTokenModel = require('../models/blackListToken.model')


module.exports.registerUser = async (req,res,next)=>{
        const error = validationResult(req)

        if(!error.isEmpty()){
            return res.status(400).json({
                error:error.array()
            })
        }

        const {fullName,email,password} = req.body

        const isUserExist = await userModel.findOne({email})
        
        if(isUserExist){
            return res.status(400).json({
                message:'user alrady exist'
            })
        }

        const hashPassword =await userModel.hashPassword(password)

        const user =await userServices.createUser({
            firstName:fullName.firstName,
            lastName:fullName.lastName,
            email,
            password: hashPassword
        })

        const token =await user.generateAuthToken()
        res.cookie('token',token)
        res.status(201).json({
            token,user
        })
}


module.exports.loginUser = async (req,res,next)=>{
    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        })
    }

    const {email,password} = req.body

    const user = await userModel.findOne({email}).select('+password')

    if(!user){
        return res.status(400).json({
            message:'invalid email or password'
        })
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        return res.status(400).json({
            message:'invalid email or password'
        })
    }

    const token  = await user.generateAuthToken()

    res.cookie('token',token)

    res.status(200).json({
        user,token
    })
}

module.exports.profileUser = async (req,res,next)=>{
    const user = req.user
    res.status(200).json({user})
}

module.exports.logoutUser = async (req , res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    await blackListTokenModel.create({token})
    res.cookie('token',null)

    res.status(200).json({
        message:'successfully logged out'
    })


}