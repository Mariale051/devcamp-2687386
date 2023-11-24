const jwt = require ('jsonwebtoken')
const usersModel = require('../models/usersModel')

//middleware para proteger rutas a usuarios no logueados 
exports.protect = async(req, res, next) => {
    
    let token
    //verificar si existe el header 
    if(req.headers.authorization && 
        req.headers.authorization.
        startsWith('Bearer')){
            token = req.
                    headers.
                    authorization.
                    split(' ')[1]
    }
    if(!token){
        return res.status(401).json({
            succes:false,
            msg: "Invalid token"
        })
    }else{
        const decoded = jwt.decode(token, process.env.JWT_SECRET_KEY)
        //console.log(decoded)
        //añadir al request el user 
        req.user = await usersModel.findById(decoded.id)
        //redirigir a la rata de crear bootcamps 
        next()
    }

}

//middleware para proteger usuarios que no tengan el rol especifico 
exports.authorize = async(req, res, next) =>{

}