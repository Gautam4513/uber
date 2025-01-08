const mongoose = require('mongoose');


const blackListSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:Date.now + (24 * 60 * 60 * 1000 ) // 1 days
    }
})

const blackListModel = mongoose.model('blacklist',blackListSchema);

module.exports = blackListModel;