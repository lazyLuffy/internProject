const {Userdata, validateUser } = require('../models/regisModel');
const Api_logs = require('../models/api_logs');
const Er_logs = require('../models/error_logs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// THIS IS AN API OF CREATE(POST)
const create = async (req,res)=>{
    const body = req.body;
    // VALIDATING BODY 
    const {error} = validateUser(body);
    if(error) return res.send({
        status:1,
        message:error.message
    })
    try {
    const userlogin = {name:body.name};
        const userdata = new Userdata({
            name:body.name,
            email:body.email,
            mobile:body.phone,
            password:body.password
        })
        const user = await userdata.save();
        console.log(user)
        // CREATING JWT JASON WEB TOKEN 
        const accesstoken = await jwt.sign(userlogin,process.env.SECRET_KEY);
        console.log(accesstoken);
        res.header('x-auth',accesstoken).send({
            status:0,
            message:`Data saved`,
            token:`${accesstoken}`
        })
    }
    catch(error){
        // CREATING COLLECTION DATA FOR ERROR ERR_LOGS
        const er_logs = new Er_logs({
            apiname:"create-api",
            error:error.toString()
        })
        const erdata = er_logs.save();
        console.log(erdata)
    }
}

// THIS IS AN API OF LOGIN (POST)
const login = async (req,res)=>{
    console.log(req.userlogin)
    console.log(req)
    try {
    const getdata = await Userdata.findOne({name:req.userlogin.name});
    // CREATING COLLECTION DATA FOR API_LOGS
        const api_logs =  new Api_logs({
            request:req.userlogin,
            method:req.method,
            Headers:req.headers,
            response:getdata
        })
        const api_logs_data = await api_logs.save();
        console.log(api_logs_data)
        res.send({
            success:0,
            data:`${getdata}`
        })
    }
    catch(error){
        // CREATINF COLLECTION DATA FOR ERROR_LOGS
        const er_logs = new Er_logs({
            apiname:"login-api",
            error:error.toString()
        })
        const erdata = er_logs.save();
        console.log(erdata)
    }
}
module.exports = {create,login}