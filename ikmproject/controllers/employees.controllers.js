const Employee = require("../models/employees.model")

const employeeService = require("../services/employees.services")

const bcrypt = require('bcrypt');




exports.create = async (req,res) =>{

    

    let data = req.body

    let hashedpassword = "  ";

    let password = data.password

    if (password.trim()){
        hashedpassword = await bcrypt.hash(password,10)
    }

    const newEmployee = new Employee({

        username : data.username,
        password : hashedpassword,
        firstname : data.firstname,
        lastname : data.lastname,
        age : data.age,
        phone : {
            type : data.phone.type,
            number: data.phone.number
        },
        roles:data.roles
    }

    )

    try{
        const result = await newEmployee.save();
        res.status(200).json({status:true,data:result})
        

    }catch(error){
        res.status(400).json({status:false, data:error})
        
    }

}


exports.finAll = async(req,res)=>{
    
    try{
        const result = await employeeService.finAll()
        res.status(200).json({status:true,data:result})
    } catch(err){
        res.status(400).json({status:false,data:err})

    }

    
}

exports.findOne = async(req,res) =>{

    let username = req.params.username;
    //console.log(username)

    try{
        const result = await employeeService.findOne(username);
       // console.log(result) 
        if(result){
            res.status(200).json({status:true,data:result})
            //console.log(data)                 // να δω αν παιζει
        }else{
            res.status(400).json({status:false,data:result})
        }
    }catch (err) {
       // console.log(err)

        res.status(400).json({status:false,data:err})
    }
}

exports.delete= async(req,res)=>{

    let username = req.body.username

    try{
        const result = await employeeService.deleteOne(username)
        res.json({status:true,data:result})
    }catch(err){
        res.json({status:false,data:err.message})//αλλιως θα το εμφανισει κενο
    }
}

exports.update = async (req,res) => {

    let username = req.params.username;
    let data = req.body; 


    try{
        const result = await employeeService.updateOne(username,data)
        res.json({status:true,data:result})    
    }catch(err){
        res.status(500).json({status:false, data:err.message})
    }
}

exports.checkDuplicateEmail = async(req, res) => {
  const email = req.params.email;
 
  console.log("Check for duplicate email address", email);
  try {
    const result = await User.findOne({ email: email });
    if (result) {
      res.status(400).json({ status: false, data: result });
    } else {
      res.status(200).json({ status: true, data: result });
    }
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.error(`Problem in finding email address: ${email}`, err);
  }
}