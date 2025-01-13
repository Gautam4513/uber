const { validationResult } = require('express-validator')
const rideModel = require('../models/ride.model')
const { createRide } = require('../Services/ride.services')


module.exports.createRideController = async (req , res , next)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error})
    }
    try{
        const {pickUp , destination , vehicleType} = req.body
        const ride = await createRide({
            userId:req.user._id,
            pickUp,
            destination,
            vehicleType
        })
        res.status(200).json({ride})
    }catch(error){
        res.status(400).json({error})
    }
}