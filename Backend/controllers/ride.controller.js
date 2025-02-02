const { validationResult } = require('express-validator')
const rideModel = require('../models/ride.model')
const { createRide, getFare, rideComplated } = require('../Services/ride.services')
const { getAddressCoordinates, getCaptainInRadius } = require('../Services/maps.services')
const { sendMessageToSoketId } = require('../soket')


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
        const pickUpCoordinates = await getAddressCoordinates(pickUp)
        const captains = await getCaptainInRadius(pickUpCoordinates.lat,pickUpCoordinates.lng,5000)
        console.log(captains)
        const rideWithUser = await ride.populate('userId')
        // console.log(rideWithUser)
        captains.map((captain)=>{
            sendMessageToSoketId(captain.soketId,{
                event:"new-ride",
                data:rideWithUser
            })
        })

    }catch(error){
        console.log(error)
        res.status(400).json({error})
    }
}

module.exports.getFareController = async (req , res ,next)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error})
    }
    try{
        const {pickUp , destination } = req.query
        const fare = await getFare(pickUp,destination)
        res.status(200).json({fare})
    }catch(error){
        res.status(400).json({error})
    }
   
}

module.exports.rideConfirmController = async (req,res,next)=>{
    try{
        const {captainId , ride}=req.body
        // console.log(captainId,ride)
        // console.log(req.captain._id)
        await rideModel.findOneAndUpdate(
            {_id:ride._id},
            {captain:req.captain._id})
        // console.log(response)
        const rideWithCaptain = await rideModel.findOne({_id:ride._id}).populate("userId").populate('captain')
        console.log(rideWithCaptain.captain)
        console.log(rideWithCaptain)
        // console.log(rideWithCaptain.userId.soketId)
        sendMessageToSoketId(rideWithCaptain.userId.soketId,{
            event:"ride-confirm",
            data:rideWithCaptain
        })
        res.status(200).json({message:"ride is confirm"})
    }catch(error){
        console.log(error)
        res.status(400).json({error})
    }
}


module.exports.rideAcceptedController = async (req ,res ,next)=>{
    try{
        const {rideId}=req.body
        console.log(rideId)
        const ride = await rideModel.findById(rideId).populate('userId').populate('captain')
        console.log(ride)
        sendMessageToSoketId(ride.userId.soketId,{
            event:"ride-accepted",
            data:ride
        })
        res.status(200).json({message:"ride-accepted"})
    }catch(error){
        console.log(error)
        res.status(400).json({error})
    }
}


module.exports.rideCompletedController = async (req,res,next)=>{
    try{
        const {rideId}=req.body
        const userSoketId =await rideComplated(rideId)
        sendMessageToSoketId(userSoketId,{
            event:"ride-finish",
            data:"ride is completed"
        })
        res.status(200).json({message:"ride is completed"})
    }catch(error){
        console.log(error)
        res.status(400).json({error})
    }
}