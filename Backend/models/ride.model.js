const mongoose = require('mongoose')


const rideSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'captainModel'
    },
    vehicleType:{
        type:String,
        enum:['car',"bike","auto"],
        required:true
    },
    pickUp:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending","onGoing","completed","cancelled"],
        default:"pending"
    },
    duration:{
        type:Number,
    },
    distance:{
        type:Number
    },
    paymentId:{
        type:String
    },
    orderId:{
        type:String
    },
    signature:{
        type:String
    },
    otp:{
        type:Number,
        required:true
    }
})

const rideModel = mongoose.model('rideModel',rideSchema)

module.exports  = rideModel