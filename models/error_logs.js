const mongoose = require('mongoose');

const Er_logs = mongoose.model('error_logs',new mongoose.Schema({
    apiname:{
        type:String
    },
    error:{
        type:String
    }
}))

module.exports = Er_logs;