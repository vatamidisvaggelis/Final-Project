const mongoose = require("mongoose");

const Shema = mongoose.Schema;


let phoneShema = new Shema({
    type : {type:String},
    number: {type:String}
},{_id:false})

let leaveShema = new Shema({
    type:{type:String},
    startdate:{type:String},
    enddate : {type : String},
    totaldays : {type : Number}
}, {_id:false})

let employeeShema = new Shema({
    username :{
        type : String,
        max : 20,
        unique : true,
        required :[true,"Username is required field"],
        trim : true,
        lowercase : true
    },

    password: {
        type : String,
        required : true,
        max : 20,
        trim:true
    },

    firstname:{
        type : String,
        required : [true,"Firstname is required field"],
        max :20,
        trim : true,
        lowercase: true
    },

    lastname:{
        type : String,
        required : [true, "Surname is required field"],
        max : 20,
        trim : true,
        lowercase : true
    },

    age:{
        type: Number,
        max:100,
        required:[true,"Age is required field"],
        trim:true
    },

    phone : {
        type : [phoneShema],
        null : true // δεν κανει απολυτως τιποτα
    },

    leave : {
        type : [leaveShema],
        null : true  // δεν κανει τιποτα απολυτως
    },

    roles:{
        type:String,
        required:[false,"Role is required field"],
        max:20,
        trim:true
    }
},
 
{
    collection: 'employees',
    timestamps : true
}


)

module.exports= mongoose.model("Employee",employeeShema)