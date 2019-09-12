
const jwt = require('jsonwebtoken')
const User = require('../database/models/User')
const config = require('config')

module.exports= (req,res, next)=>{
    const token = req.header('Authorization')
    const errors = []
 
    if(!token){
        errors.push({message: "Unauthorized request, access denied."})
        return res.status(401).send(errors
        )
    }
    try {
      
     
        const decodedToken = process.env.JWT_SECRET?process.env.JWT_SECRET: jwt.verify(token, config.get('jwtSecret'));
           
    
        req.user = decodedToken.user;

        next();
    } catch (error) {
        
        errors.push({message: "Invalid token."})
        return res.status(401).send(errors)
    }
}