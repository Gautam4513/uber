const captainModel = require('../models/captain.model')
const {validationResult} = require('express-validator')
const captainServices = require('../Services/captain.services')


module.exports.registerCaptain = async (req,res,next)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({
                error:error.array()
            })
        }

        const {fullName,email,password,vehicle} = req.body

        const isExist = await captainModel.findOne({email})
        if(isExist){
            return res.status(400).json({
                error:[{msg:'captain already exists'}]
            })
        }
        
        const hashPassword = await captainModel.hashPassword(password)

        const captain = await captainServices.creatCaptain({
            firstName:fullName.firstName,
            lastName:fullName.lastName,
            email,
            password:hashPassword,
            color:vehicle.color,
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            type:vehicle.type
        })

        const token = await captain.generateAuthToken()

        res.cookie('token',token),

        res.status(201).json({
            captain,token
        })
}