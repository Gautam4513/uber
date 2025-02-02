const captainModel = require('../models/captain.model');
const rideModel = require('../models/ride.model')
const { getDistanceTime } = require('./maps.services')
const crypto = require('crypto');


const getDistanceTimeFunction = async (pickUp, destination)=>{
    return await getDistanceTime(pickUp, destination)
}
const calculateFare = (distanceTime) => {
   
    const baseCost = {
        auto: 3,
        car:5,
        bike: 2
    }
    const perKMCost = {
        auto: 5,
        car: 10,
        bike: 3
    }
    const perMinCost = {
        auto: 1,
        car: 1,
        bike: 1
    }
    const totalCost = {
        auto: Math.floor(baseCost.auto + ((distanceTime.distance.value / 1000) * perKMCost.auto) + ((distanceTime.duration.value / 60) * perMinCost.auto)),
        car:Math.floor( baseCost.car + ((distanceTime.distance.value / 1000) * perKMCost.car) + ((distanceTime.duration.value / 60) * perMinCost.car)),
        bike: Math.floor(baseCost.bike + ((distanceTime.distance.value / 1000) * perKMCost.bike) + ((distanceTime.duration.value / 60) * perMinCost.bike))
    }
    return totalCost
}

module.exports.getFare = async (pickUp, destination)=>{

   const distanceTime= await getDistanceTimeFunction(pickUp , destination)
   return calculateFare(distanceTime)
}

function generateOtp() {
    // Generate a random number using crypto
    const otp = crypto.randomInt(100000, 1000000); // Generate a number between 100000 and 999999
    return otp; // Convert to string if needed
  }

module.exports.createRide = async ({
    userId,
    pickUp,
    destination,
    vehicleType
}) => {

    if(!userId || !pickUp || !destination || !vehicleType){
        throw ({message : "all filds are require"})
    }
    try{
        const distanceTime =await getDistanceTimeFunction(pickUp , destination)
        const fare = calculateFare(distanceTime)[vehicleType]
        // console.log(fare)
        // console.log(fare.Promise)
        const ride = rideModel.create({
            userId,
            pickUp,
            destination,
            vehicleType,
            distance:distanceTime.distance.value,
            duration:distanceTime.duration.value,
            fare,
            otp:generateOtp()
        })
        return ride

    }catch(error){
        console.log(error)
        throw error
    }

}

module.exports.rideComplated = async (rideId)=>{
    const ride = await rideModel.findById(rideId).populate('userId').populate('captain')
    try{
        await captainModel.findOneAndUpdate({_id:ride.captain._id},{ernning:(ride.captain.ernning+ride.fare)})
        await rideModel.findByIdAndUpdate(rideId,{status:"completed"})
        console.log(ride.userId.soketId,"this is user id")
        return (ride.userId.soketId)
    }catch(error){
        console.log(error)
        throw error
    }
}