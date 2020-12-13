const express = require('express')
const bodyParser = require('body-parser')
const port = 3000
const appp = express()

appp.use(bodyParser.urlencoded({extended : true}))
appp.use(bodyParser.json())

const {employeesModel} = require('./connector')

const aggregateFunc = function(postion){
    const resultArray = employeesModel.aggregate([{
    
        $project:{
            name: 1,
            designation: 1,
            status: {$eq: ["$status" , "available"]}
        }
    },
    {
        $match:{
            $and : [
                { designation : postion},{status : true }
            ]
                
        }
    }
    
]).then(result => {return result} )
    return resultArray;
}


appp.get('/',(req,res)=>{
    const respondentArray = aggregateFunc("respondent")
    respondentArray.then(result => {
        if(result.length !== 0){
            res.send({"allocatedEmployee" : result[0].name, "designation" : result[0].designation})
        }else{
            const managerArray = aggregateFunc("manager")
            managerArray.then(result =>{
                if(result.length !== 0){
                    res.send({"allocatedEmployee" : result[0].name, "designation" : result[0].designation})
                }else{
                    const directorArray = aggregateFunc("director")
                    directorArray.then(result =>{
                        res.send({"allocatedEmployee" : result[0].name, "designation" : result[0].designation})
                    }).catch(error => res.send(error.message));
                }
            }).catch(error => res.send(error.message));
        }
    }).catch(error => res.send(error.message)); 
})

appp.listen(port , ()=> console.log(`App Listening to port ${port}`))