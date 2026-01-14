const jwt = require('jsonwebtoken')


function generateAccessToken (result){

    const payload = {
        username : result.username,
        firstname: result.firstname,
        lastname : result.lastname
    }

    const secret = process.env.Token_Secret

    const option = {
        expiresIn:'1h'
    }

    const jwttoken = jwt.sign(payload,secret,option)
    return jwttoken

}

function verifyAccessToken(token){
    const secret = process.env.Token_Secret;
    try{

        const payload = jwt.verify(token,secret)
        console.log(payload)
        return {verify:true, data:payload}
    }catch(err){
        return {verify:false,data:err.message}
    } 
}

module.exports = {generateAccessToken , verifyAccessToken}