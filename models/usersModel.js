const mongoose = require('mongoose')
const bcryptjs = require ('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "nombre requerido"],
    },
    email: {
        type: String,
        unique: [true, "email requerido"],
        required: [true, "email requerido"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
        "email invalido"]
    },
    password:{
        type: String,
        required: [true, "password requerido"],
        maxlength: [6,"password muy largo"],
        select: false 
    },
    role: {
        type: String,
        enum: ["admin", "user", "publisher"],
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function(){
    //generar la sal 
    const sal = await bcryptjs.genSalt(10 , this.password)
    //encriptar el password utilizando la sal
    this.password = await bcryptjs.hash(this.password, sal)
})

//metodo para comparar password del usuario vs password del payload
userSchema.methods.compararPassword = async function (password){
    return bcryptjs.compare(password, this.password)
}

module.exports = mongoose.model('User' , userSchema) 