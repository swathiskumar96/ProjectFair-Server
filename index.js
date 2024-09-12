require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')

//create an express app
const pfServer = express()
 
//use cors in express server
 pfServer.use(cors())
 pfServer.use(express.json())
 pfServer.use(router)
 pfServer.use('/uploads',express.static('./uploads'))

 const PORT = 3000 || process.env.PORT

 pfServer.listen(PORT,()=>{
    console.log(`Project fair server started at PORT : ${PORT}`);
 })

 pfServer.get("/",(req,res)=>{
   res.status(200).send(`<h1 style="color:blue">Project Fair Server Started and waiting for client request</h1> `)
 })

 pfServer.post("/",(req,res)=>{
   res.status(200).send(`POST REQUEST`)
 })

