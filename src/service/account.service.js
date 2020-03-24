'use strict';

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const users = require('../models/User');

module.exports.registerService = (request, userDetail) =>{
    return new Promise(async(resolve, reject) => {
        
        let user = await users.findOne({
            where : {
                email: request.payload.email
            }
        })

        if(!user){
            let hash = await bcrypt.hash(request.payload.password, 10);
            userDetail.password = hash            
            if(users.create(userDetail)){
                return resolve({ status: 200,
                    email: userDetail.email,
                    message: 'Your registration has been submitted successfully' })
            } else {
                reject(err);
            }        
            
        } else {     
            reject ({status: 409,
                email: userDetail.email,
                message: `User already exists`})
        }
    })
}


module.exports.loginService = (request) =>{
    return new Promise(async(resolve, reject) => {
        
        let user = await users.findOne({
            where : {
                email: request.payload.email
            }
        })

        if(user){
            if (bcrypt.compareSync(request.payload.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                return resolve({ status: 200, token})
            } else {
                const err = {
                    status: 401,
                    message: "You have enter wrong email and password"
                }           
                reject (err)
            }
        } else {
            const err = {
                status: 404,
                message: "User not found"
            }           
            reject (err)
        }
    })
}
