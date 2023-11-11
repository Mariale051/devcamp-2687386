const express = require ('express')
const mongoose = require ('mongoose')
 //definir el ruteador 
 const router = express.Router()
 const CoursesModel = require('../models/coursesModel')

 //traer todos los courses
 router.get('/', async (req, res)=>{
    //utiizar el model para seleccionar todos los courses 

    try {
        const courses =
            await CoursesModel.find()
        if(courses.length > 0){
            res.
            status(200).
            json({
                success: true,
                data: courses
            })
        }else{
            res.
            status(400).
            json({
                success: false,
                message: 'No hay courses'
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

//courses por id
router.get('/:id', async (req, res)=>{
    //Extraer el id del courses del parametro url
    try{
        coursesId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(coursesId)){
            res.status(500)
            .json({
                success: false,
                msg: "identificador invalido"
                })
        }else{
            const courses = await CoursesModel.findById(coursesId)
            if(courses){
                res.
                status(200)
                .json({
                    success: true,
                    data: courses
            })
            }else{
                res
                .status(400)
                .json({
                    success: false,
                    message: `No hay courses con id: ${coursesId}`
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

//crear courses
router.post('/', async (req, res)=>{
    try {
        const newCourses = 
            await CoursesModel.create(req.body)
        res.
        status(201)
        .json({
            success: true,
            dara: newCourses
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

//actualizar un courses por id 
router.put('/:id', async (req, res)=>{

    try {
        const coursesId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(coursesId)){
            res.status(500)
            .json({
                success: false,
                msg: "identificador invalido"
                })
        }else{
            const updCourses = 
                await CoursesModel.findByIdAndUpdate(
                    coursesId,
                    req.body,
                    {
                        new: true 
                    })
            if(updCourses){
                res.
                    status(200).
                    json({
                    success: true,
                    data: updCourses
                })
            }else{
                res
                .status(400)
                .json({
                    success: false,
                    message: `No hay courses con id: ${coursesId}`
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

//eliminar un courses por id  
router.delete('/:id', async (req, res)=>{
    try {
        const coursesId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(coursesId)){
            res.status(500)
            .json({
                success: false,
                msg: "identificador invalido"
                })
        }else{
            const delCourses = await CoursesModel.findByIdAndDelete(
                coursesId
            )
            if(delCourses){
                res.
                    status(200).
                    json({
                    success: true,
                    data: delCourses
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