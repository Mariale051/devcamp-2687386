const express = require ('express')
const router = express.Router()
const UserModel = require('../models/usersModel')
const mongoose = require('mongoose')

//registro de usuarios
router.post('/register', async (req, res) => {
    try {
        const user = await UserModel.create(req.body)
        //crear token 
        const token = user.generarJWT()
        res.status(201).json({
            success: true,
            data: user,
            token_jwt: token  
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
    
//inicio de sesion
router.post('/login', async (req, res) =>{
    //No llega email o password 
    const { email , password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: 'Falta email o password'
        })
    }else{
        try {
           //Si llega email pero el usuario no existe 
        const user = await UserModel.findOne({email}).select("+password")
        //console.log(user)
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'El usuario no existe'
            })
        }else{
             //si llega email, y el usuario existe pero el password no correponde 
            const isMatch = await user.compararPassword(password)
            if(isMatch){
                const token = user.generarJWT()
                //opciones para la creacion de la cookie
                const options = {
                    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 1000),

                httpOnly: true, 
                }
                return res.
                    status(200).
                    cookie('token', token, options).
                    json({
                        success: true,
                        msg: "Usuario logeado correctamente",
                        data: user,
                        jwt_token: token 
                })
            }else{
                return res.status(400).json({
                    success: false,
                    message: 'credenciales imcorrectas'
                })
            }
        } 
        } catch (error) {
                res.status(500).json(
                    {   success:false, 
                        msg: error.message
                    }
                )
        }
        
    }
    
})

module.exports = router