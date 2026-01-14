const employee = require('../models/employees.model')


function finAll() {
    const result = employee.find()
    return result
}

function findOne(username){

    const result = employee.findOne({username:username});
    return result;
}

function deleteOne(username){
    const result = employee.findOneAndDelete({username:username})
    return result;
}

function updateOne(username,data){

    const updateemployee = {
        firstname:data.firstname,
        lastname:data.lastname,
        phone:{
            type:data.phone.type,
            number:data.phone.number
        }
    }

    const result = employee.findOneAndUpdate({username:username},updateemployee,{new:true})
    return result
}


module.exports = {finAll,findOne,deleteOne,updateOne}