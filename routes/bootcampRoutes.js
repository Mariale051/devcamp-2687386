const express = require ('express')
const mongoose = require ('mongoose')
 //definir el ruteador 
 const router = express.Router()
 const BootcampModel = require('../models/bootcampModel')


 //traer todos los bootcamps
router.get('/', async (req, res)=>{
    //utiizar el model para seleccionar todos los bootcamps 

    try {
        const bootcamps =
            await BootcampModel.find()
        if(bootcamps.length > 0){
            res.
            status(200).
            json({
                success: true,
                data: bootcamps
            })
        }else{
            res.
            status(400).
            json({
                success: false,
                message: 'No hay bootcamps'
            })

        }
        
    } catch (error) {
        res.status(400)
            .json({
                success: false,
                message: error.message
            })
        
    }
    
})


//bootcamp por id
router.get('/:id', async (req, res)=>{
    //Extraer el id del bootcamp del parametro url
    try{
        bootcampId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(bootcampId)){
            res.status(500)
            .json({
                success: false,
                msg: "identificador invalido"
                })
        }else{
            const bootcamp = await bootcampModel.findById(bootcampId)
            if(bootcamp){
                res.
                status(200)
                .json({
                    success: true,
                    data: bootcamp
            })
            }else{
                res
                .status(400)
                .json({
                    success: false,
                    message: `No hay bootcamps con id: ${bootcampId}`
            })
            }
        }
    }catch(error){
        res.
        status(400)
        .json({
            success: false,
            message: error.message
        })
    }
})


//crear bootcamps
router.post('/', async (req, res)=>{
    try {
        const newBootcamp = 
            await BootcampModel.create(req.body)
        res.
        status(201)
        .json({
            success: true,
            dara: newBootcamp
    })
    }catch (error){
        res.
        status(200)
        .json({
            success: true,
            message: error.message
        })
        
    }

})


//actualizar un bootcamp por id 
router.put('/:id', async (req, res)=>{

    try {
        const bootcampId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(bootcampId)){
            res.status(500)
            .json({
                success: false,
                msg: "identificador invalido"
                })
        }else{
            const updBootcamp = 
                await BootcampModel.findByIdAndUpdate(
                    bootcampId,
                    req.body,
                    {
                        new: true 
                    })
            if(updBootcamp){
                res.
                    status(200).
                    json({
                    success: true,
                    data: updBootcamp
                })
            }else{
                res
                .status(400)
                .json({
                    success: false,
                    message: `No hay bootcamps con id: ${bootcampId}`
                })
            }
        }
    }catch (error) {
        res.
        status(400)
        .json({
            success: true,
            message: error.message
        })
    }
})

//eliminar un bootcamp por id  
router.delete('/:id', async (req, res)=>{
    try {
        const bootcampId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(bootcampId)){
            res.status(500)
            .json({
                success: false,
                msg: "identificador invalido"
                })
        }else{
            const delBootcamp = await BootcampModel.findByIdAndDelete(
                bootcampId
            )
            if(delBootcamp){
                res.
                    status(200).
                    json({
                    success: true,
                    data: delBootcamp
                })
            }
        }
    }catch (error) {
        res.
        status(400)
        .json({
            success: true,
            message: error.message
        })
    }
})

module.exports = router 