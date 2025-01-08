const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log('database connected')
    }).catch((e)=>{
        console.log(e)
    })
}

module.exports = connectToDb;