const express = require('express')
const Router = require("./router.js")
const mongoose  = require("mongoose")
const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.use("/", Router)

const start = async () => {
    try{
        const port = process.env.PORT
        app.listen(port, () => console.log(`\n[+] server started on port ${port}`))        
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
        console.log('[+] mongobd database connected')
    } catch(e){
        console.log(e)
    }
}

start()