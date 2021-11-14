const {Schema, model} = require("mongoose")  

const data = new Schema({
    long_url:{type:String, required:true, unique:true},
    short_url:{type:String, required:true, unique:true}
})

module.exports = model('data', data)