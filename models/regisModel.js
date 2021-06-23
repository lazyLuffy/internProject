const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require("joi-password-complexity");

const Userdata = mongoose.model('registration', new mongoose.Schema({
        name: {
        type: String,
        required:true
        },
        email: {
        type: String,
        required:true,
        unique:true
        },
        mobile: {
        type: Number
        },
        password: {
        type: String,
        required:true
        }
}))
function validateUser(user) {
    const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required(),
    email: Joi.string()
        .email()
        .max(255)
        .required(),
    phone: Joi.number()
            .required(),
    password:  new PasswordComplexity({
    min: 8,
    max: 25,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4
    })
    })
    return schema.validate(user);
}
module.exports = {Userdata, validateUser}