const authServices = require('../services/auth.services')
const User = require('../models/employees.model')
const bcrypt = require('bcrypt')


exports.login = async (req,res)=>{

    let data = req.body;

    let username = data.username;
    let password =data.password;
try{
    const result = await User.findOne({username:username});
    if (!result){
        return res.status(400).json({status:false, message:"User not found"});}
        
    const isMatch = await bcrypt.compare(password,result.password)

    if (!isMatch){
         console.log(isMatch)
        return res.status(400).json({status:false, message:"Invalid password"})}
        
    const token = await authServices.generateAccessToken(result)
    res.status(200).json({status:true, data:token})


    }catch(err){
        // console.log(err)
        res.status(400).json({status:false, message:err.message})
    }




}