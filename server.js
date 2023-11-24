const express = require('express')
const dotenv = require('dotenv')
const colors = require ('colors')
const conectarDB = require('./config/db')
const cookieParser = require ('cookie-parser')

//dependencias de rutas 
const bootcampRoutes = require('./routes/bootcampRoutes')
const coursesRoutes = require('./routes/coursesRoutes')
const reviewsRoutes = require('./routes/reviewsRoutes')
const usersModel = require('./routes/usersRoutes')


//vincular el archivo .env
dotenv.config(
    { path :'./config/.env' }
)

//conetar a la bd 
conectarDB()

//construir objeto app 
const app = express()
app.use(express.json())
app.use(cookieParser())

//conectar las rutas al objeto 
app.use('/api/v1/devcamp/bootcamps',bootcampRoutes)
app.use('/api/v1/devcamp/courses',coursesRoutes)
app.use('/api/v1/devcamp/reviews',reviewsRoutes)
app.use('/api/v1/devcamp/users',usersModel)


app.listen(process.env.PUERTO , () => {
    console.log(`Servidor en ejecucion ${process.env.PUERTO}`.bgYellow.green.bold )
})