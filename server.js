const express = require('express')
const dotenv = require('dotenv')
const colors = require ('colors')
const conectarDB = require('./config/db')

//dependencias de rutas 
const bootcampRoutes = require('./routes/bootcampRoutes')
const coursesRoutes = require('./routes/coursesRoutes')
const reviewsRoutes = require('./routes/reviewsRoutes')

//vincular el archivo .env
dotenv.config(
    { path :'./config/.env' }
)

//conetar a la bd 
conectarDB()

//construir objeto app 
const app = express()
app.use(express.json())

//conectar las rutas al objeto 
app.use('/api/v1/devcamp/bootcamps',bootcampRoutes)
app.use('/api/v1/devcamp/courses',coursesRoutes)
app.use('/api/v1/devcamp/reviews',reviewsRoutes)

//rutas de prueba 
app.get('/prueba', (request , response) => {
    response.send("Hola")

})

//rutas bootcamps
//endpoint

//users 
//aqui se moostrara todos los users 
app.get('/users', (req, res)=>{
    res.json({
        success: true,
        msg: "aqui se mostraran todos los users"
    })
})

//traer un user por id 
app.get('/users/:id', (req, res)=>{
    res.json({
        success: true,
        msg: `aqui se mostrara users cuyo id es ${req.params.id}`
    })
})

//crear user
app.post('/users', (req, res)=>{
    res.json({
        success: true,
        msg: "aqui se creara un user"
    })
})

//actualizar un user por id 
app.put('/users/:id', (req, res)=>{
    res.json({
        success: true,
        msg: `aqui se modificara un user cuyo id es ${req.params.id}`
    })
})

app.delete('/users/:id', (req, res)=>{
    res.json({
        success: true,
        msg: `aqui se eliminara un user cuyo id es ${req.params.id}`
    })
})

//courses
//aqui se moostrara todos los courses
app.get('/courses', (req, res)=>{
    res.json({
        success: true,
        msg: "aqui se mostraran todos los courses"
    })
})

//traer un courses por id 
app.get('/courses/:id', (req, res)=>{
    res.json({
        success: true,
        msg: `aqui se mostrara course cuyo id es ${req.params.id}`
    })
})

//crear courses
app.post('/courses', (req, res)=>{
    res.json({
        success: true,
        msg: "aqui se creara un course"
    })
})

//actualizar un courses por id 
app.put('/courses/:id', (req, res)=>{
    res.json({
        success: true,
        msg: `aqui se modificara un course cuyo id es ${req.params.id}`
    })
})

//eliminara un courses por id 
app.delete('/courses/:id', (req, res)=>{
    res.json({
        success: true,
        msg: `aqui se eliminara un course cuyo id es ${req.params.id}`
    })
})

//reviews 
//aqui se moostrara todos los reviews
app.get('/reviews', (req, res)=>{
    res.json({
        success: true,
        msg: "aqui se mostraran todos los review"
    })
})

//traer un reviews por id 
app.get('/reviews/:id', (req, res)=>{
    res.json({
        success: true,
        msg: `aqui se mostrara review cuyo id es ${req.params.id}`
    })
})

//crear courses
app.post('/reviews', (req, res)=>{
    res.json({
        success: true,
        msg: "aqui se creara un review"
    })
})

//actualizar un reviews por id 
app.put('/reviews/:id', (req, res)=>{
    res.json({
        success: true,
        msg: `aqui se modificara un review cuyo id es ${req.params.id}`
    })
})

//eliminara un reviews por id 
app.delete('/reviews/:id', (req, res)=>{
    res.json({
        success: true,
        msg: `aqui se eliminara un review cuyo id es ${req.params.id}`
    })
})


app.get('/prueba/:id', (request , response) => {
    response.send(`Hola , ${ request.params.id }`)

})

app.listen(process.env.PUERTO , () => {
    console.log(`Servidor en ejecucion ${process.env.PUERTO}`.bgYellow.green.bold )
})