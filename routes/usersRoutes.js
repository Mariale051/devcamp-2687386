const express = require ('express')
const router = express.Router()
const UserModel = require('../models/usersModel')
const mongoose = require('mongoose')

//registro de usuarios
router.post('/register', async (req, res) => {
    try {
        const user = await UserModel.create(req.body)
        res.status(201).json({
            success: true,
            data: user
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
                return res.status(200).json({
                    success: true,
                    msg: "Usuario logeado correctamente",
                    data: user
                })
            }else{
                return res.status(400).json({
                    success: false,
                    message: 'credenciales imcorrectas'
                })
            }
        }
    }
    
})

module.exports = router