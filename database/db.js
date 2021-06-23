const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb+srv://jatin121:jatin121@cluster0.10hbv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('database connected...')
}).catch((error)=>{
    console.log('Not Connected',error)
});