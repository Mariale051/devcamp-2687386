const mongoose = require ('mongoose')

const CoursesSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, "titulo ya esta" ],
        required: [
            true,
            "titulo es requerido"
        ],
        maxlength: [
            30, "Titulo no debe ser mayor a 30 caracteres"
        ],
        minlength :[
            10, "Titulo debe tener minimo 10 caracteres"
        ]
    },
    description :{
        type: String,
        required: [
            true,
            "Descripcion requerido"
        ],
        min :[
            10, "Descripcion debe tener minimo 10 caracteres"
        ]
    },
    weeks: {
        type : Number, 
        required: [true , 
            "Semana requerida"
        ],
        max :[
            9, "maximo de semanas debe ser 9 "
        ]
    },
    enroll_cost: {
        type : Number, 
        required: [true , 
            "Costo requerido"
        ]
    },
    minimum_skill: {
        type : String, 
        required: [true , 
            "Habilidad requerida"
        ]
    },
    createdAt: Date
})

module.exports = mongoose.model("Courses" , CoursesSchema)