'use strict';

const userController = require('../controller/userController');

process.env.SECRET_KEY = 'secret';
const Joi = require('@hapi/joi');

module.exports = [
    {
        method: 'POST',
        path: '/auth/register',
        handler: userController.register,
        options:{
            auth : false,
            description: 'To authenticate admin user.',
            notes: 'register api',
            tags: ['api', 'User'], 
            validate:{
                payload:Joi.object().keys({
                    first_name: Joi.string().required(),
                }).unknown(true)
            }
        }
    },
    
    {
        method: 'POST',
        path: '/auth/login',
        handler: userController.login,
        options:{
            auth : false,
            description: 'To authenticate admin user.',
            notes: 'register api',
            tags: ['api', 'User'], 
            validate:{
                payload:Joi.object().keys({
                    email: Joi.string().email().required().label("Not a valid email!"),
                }).unknown(true)
            }
        }
    }
]
