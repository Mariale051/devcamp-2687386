const mongoose = require ('mongoose')

const ReviewsSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, "titulo ya esta" ],
        required: [
            true,
            "titulo es requerido"
        ],
        maxlength: [
            20, "Titulo no debe ser mayor a 20 caracteres"
        ]
    },
    text :{
        type: String,
        required: [
            true,
            "texto requerido"
        ],
        max :[
            50, "texto debe tener maximo 50 caracteres"
        ]
    },
    rating: {
        type : [Number], 
        required: [true , 
            "calificacion requerida"
        ],
        enum: [1,2,3,4,5,6,7,8,9,10,
        "Puntuacion del 1 al 10"]
    },
    createdAt: Date
})

module.exports = mongoose.model("Reviews" , ReviewsSchema)