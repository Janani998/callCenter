const mongoURI = "mongodb://localhost:27017" + "/callCenter"
let mongoose = require('mongoose');
const { employeeSchema } = require('./schema')

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });

employeesModel = mongoose.model('callCenterEmployees', employeeSchema)


exports.employeesModel = employeesModel;