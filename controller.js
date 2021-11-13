const {validationResult} = require('express-validator')

const generateUrl = () =>{
    var length = 5,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

var data = {}

class controller {

    async short_my_url(req,res) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"errors", errors})
            }

            const shorten_url = generateUrl()
            const long_url = req.body.url
            data[shorten_url] = long_url
            await res.json({shortenUrl:`http://localhost:5000/${shorten_url}`})
        } catch(e){
            console.log(e)
            res.json({message:"wrong url or try later"})
        }    
    }

    async redirect(req,res) {
        await res.redirect(data[req.params.id])
    }

    async get_all(req,res){
        await res.send(JSON.stringify(data, undefined, 2))
    }
}

module.exports = new controller()