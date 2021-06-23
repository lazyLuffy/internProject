const mongoose = require('mongoose');


const Api_logs =  mongoose.model('api_logs',new mongoose.Schema({
    request:{
        type:Object
    },
    method:{
        type:String
    },
    Headers:{
        type:Object
    },
    response:{
        type:Object
    }
}))

module.exports = Api_logs