const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const captainSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:[3,"firstname must be grater than 3 characters"]
        },
        lastName:{
            type:String,
            minlength:[3,"lastname must be grater than 3 characters"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[12 , 'invalid email']

    },
    password:{
        type:String,
        required:true,
        minlength:[6, 'password must be at least 6 characters'],
        select: false
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    soketId:{
        type:String
    },
    ernning:{
        type:Number
    },
    vehicle:{
        color:{
            type:String,
            required:true
        },
        plate:{
            type:String,
            required:true
        },
        capacity:{
            type:Number,
            required:true
        },
        type:{
            type:String,
            enum:['bike','car','auto']
        }
    },
    location:{
        ltd:{
            type:Number
        },
        lng:{
            type:Number
        }
    }
})

captainSchema.methods.generateAuthToken =function(){
    const token =jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password , 10)
}

const captainModel = mongoose.model('captainModel', captainSchema)

module.exports = captainModel