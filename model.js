const {Schema, model} = require("mongoose")  

const data = new Schema({
    long_url:{
        type:String, 
        required:true, 
        unique:true
    },
    /*
    protocol:{
        type:String, 
        default:"http://"
    },
    */
    short_url:{
        type:String, 
        required:true, 
        unique:true
    },
    date:{
        type:Date, 
        required:true, 
        default:new Date()
    }
})

module.exports = model('data', data)