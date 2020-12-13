const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    }
})

exports.employeeSchema = employeeSchema;  