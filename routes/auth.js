const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../database/models/User')

const auth = require('../middleware/auth')


//@route Post api/auth/register
//@desc  register user to api
//@access   public
router.post('/register', [
        check('name', 'Name is Required').not().isEmpty(),
        check('email', 'Email is Required').isEmail(),       
        check('password', 'Password is Required').isLength({min:6 })
    ],async(req , res)=>{
    //check register fields
    const errors = []
    const valid_errors = validationResult(req)
    
    if(valid_errors.errors.length){
       
        errors = errors + valid_errors.array()
        return res.status(400).send(errors)       
    }  
         
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({email})
    
        
        if(user){
            // errors.push({message: "The email has already been taken."})
            return  res.status(412).send({message: "The email has already been taken."})
        }
        user = new User({
            name,
            email,
            password
        })
        const salt = await bcrypt.genSalt(10)
    
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        const payload = {
            user:{
                id: user.id,
                name: user.name,
            }
        }
        jwt.sign(payload, config.get('jwtSecret'),{
            expiresIn: 600000,
        
        }, (error, token)=>{
            if(error) throw error;
            res.status(200).send({ 
                
                    token, 
                    user:{
                        id: user.id,
                        name: user.name,
                    
                    } 
            })
        })
    } catch (error) {
       
        errors.push({message: 'Server Errror'})
        return res.status(500).send(errors)
    }
})

//@route Post api/auth/login
//@desc  login user to api
//@acess   public

router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', "Password is required").exists()

] , async(req , res)=>{
    
        const errors = []
        const valid_errors = validationResult(req)
            
        if(valid_errors.errors.length){

            errors = errors + valid_errors.array()
            return res.status(400).send(errors)       
        }  
         
        const {email, password} = req.body
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).send({
                    "message": "Invalid Credentials"
                })
            }
            const match = bcrypt.compare(password, user.password);

            if(!match){
                errors.push({ "message": "Invalid Credentials"})
                return res.status(400).send(errors)
            }

            const payload = {
                user:{
                    id: user.id,
                    name: user.name,
    
                }
            }
            jwt.sign(payload, config.get('jwtSecret'),{
                expiresIn: 600000,

            }, (error, token)=>{
                if(error) throw error;
                return res.status(200).send({ 
                        token, 
                        user:{
                            id: user.id,
                            name: user.name,
                           
                        }              
                })
            })
        } catch (error) {
            errors.push({message: 'Server Errror'})
            return res.status(500).send(errors)
        }   
})
module.exports = router;