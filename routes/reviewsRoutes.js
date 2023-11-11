const express = require ('express')
const mongoose = require ('mongoose')
 //definir el ruteador 
 const router = express.Router()
 const reviewsModel = require('../models/reviewsModel')

 //traer todos los reviews
 router.get('/', async (req, res)=>{
    //utiizar el model para seleccionar todos los reviews 

    try {
        const reviews =
            await reviewsModel.find()
        if(reviews.length > 0){
            res.
            status(200).
            json({
                success: true,
                data: reviews
            })
        }else{
            res.
            status(400).
            json({
                success: false,
                message: 'No hay reviews'
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

//reviews por id
router.get('/:id', async (req, res)=>{
    //Extraer el id del reviews del parametro url
    try{
        reviewsId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(reviewsId)){
            res.status(500)
            .json({
                success: false,
                msg: "identificador invalido"
                })
        }else{
            const reviews = await reviewsModel.findById(reviewsId)
            if(reviews){
                res.
                status(200)
                .json({
                    success: true,
                    data: reviews
            })
            }else{
                res
                .status(400)
                .json({
                    success: false,
                    message: `No hay reviews con id: ${reviewsId}`
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

//crear reviews
router.post('/', async (req, res)=>{
    try {
        const newReviews = 
            await reviewsModel.create(req.body)
        res.
        status(201)
        .json({
            success: true,
            dara: newReviews
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

//actualizar una reviews por id 
router.put('/:id', async (req, res)=>{

    try {
        const reviewsId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(reviewsId)){
            res.status(500)
            .json({
                success: false,
                msg: "identificador invalido"
                })
        }else{
            const updReviews = 
                await reviewsModel.findByIdAndUpdate(
                    reviewsId,
                    req.body,
                    {
                        new: true 
                    })
            if(updReviews){
                res.
                    status(200).
                    json({
                    success: true,
                    data: updReviews
                })
            }else{
                res
                .status(400)
                .json({
                    success: false,
                    message: `No hay reviews con id: ${reviewsId}`
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
        const reviewsId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(reviewsId)){
            res.status(500)
            .json({
                success: false,
                msg: "identificador invalido"
                })
        }else{
            const delreviews = await reviewsModel.findByIdAndDelete(
                reviewsId
            )
            if(delreviews){
                res.
                    status(200).
                    json({
                    success: true,
                    data: delreviews
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