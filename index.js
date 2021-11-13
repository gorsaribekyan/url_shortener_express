const express = require('express')
const Router = require("./router.js")

const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.use("/", Router)

app.listen(5000, ()=>{console.log("server started")})

