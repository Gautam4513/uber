const captainModel = require('../models/captain.model')
const { validationResult } = require('express-validator')
const captainServices = require('../Services/captain.services');
const blackListModel = require('../models/blackListToken.model');


module.exports.registerCaptain = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({
            error: error.array()
        })
    }

    const { fullName, email, password, vehicle } = req.body

    const isExist = await captainModel.findOne({ email })
    if (isExist) {
        return res.status(400).json({
            error: [{ msg: 'captain already exists' }]
        })
    }

    const hashPassword = await captainModel.hashPassword(password)

    const captain = await captainServices.creatCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        type: vehicle.type
    })

    const token = await captain.generateAuthToken()

    res.cookie('token', token),

        res.status(201).json({
            captain, token
        })
}

module.exports.loginCaptain = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const {email , password } = req.body;

    const captain  = await captainModel.findOne({email}).select('+password')

    if(!captain){
        return res.status(400).json({
            message:'invalid email or password'
        })
    }

    const isMatch = await captain.comparePassword(password)

    if(!isMatch){
        return res.status(400).json({
            message:'invalid email or password'
        })
    }

    const token = await captain.generateAuthToken()

    res.cookie('token',token)

    res.status(200).json({token,captain})

}

module.exports.ProfileCaptain = async (req, res ,next)=>{
    res.status(200).json({captain:req.captain})
}

module.exports.logoutCaptain = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    await blackListModel.create({token})

    res.cookie('token',null)

    res.status(200).json({
        message:'logged out successfully'
    })
}