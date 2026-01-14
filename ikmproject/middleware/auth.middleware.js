const authService = require('../services/auth.services')

async function verifyToken (req,res,next ) {

    const authHeader = req.headers['authorization']

    // console.log(req)

    // console.log(authHeader)

    const token = authHeader && authHeader.split(' ')[1];
    //console.log(token)

    if(!token){
        return res.json({status:400,message:'Access denied. No token provide'})
    }

    const result = authService.verifyAccessToken(token)

    if(result.verify){
        req.user = result.data;
        next()
    }else {
        return res.json({status:false,data:result.data})
    }


}


async function verifyRole(Role) {
    return (req,res,next) => {

        if(!req.user|| !req.user.roles){
            return res.json({status:false,data:"No roles found"})
        }

        const roles = req.user.roles

        const hasPermission = roles.include(Role)
        
        if(!haPermission){
            return res.json({status:false,data: "Forbidden: insufficient permissions"})
        }

        next()
    }
    
} 

module.exports = {verifyRole, verifyToken}