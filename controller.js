const {validationResult} = require('express-validator')
const data = require("./model.js")

const generateUrl = async () =>{
    var length = 5,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        short_url = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        short_url += charset.charAt(Math.floor(Math.random() * n));
    }
    const short_url_existent = await data.findOne({short_url})
    if(!short_url_existent){
        return short_url;
    }else{
        return generateUrl()
    }
}


class controller {

    async short_my_url(req,res) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json(errors)
            }

            const long_url = req.body.url
            const short_url = await generateUrl()
            
            console.log(short_url + " " + long_url)

            const long_url_existent =  await data.findOne({long_url})
            if(!long_url_existent){
                const result = new data({long_url, short_url})
                await result.save()     
            }
            res.json({shortenUrl:`http://localhost:5000/${short_url}`})

        } catch(e){
            console.log(e)
            res.status(400).json({message:"wrong url or try later"})
        }    
    }

    async redirect(req,res) {
        console.log("mi ban")
        //await res.redirect(data[req.params.id])
    }




    async get_all(req,res){
        res.send(JSON.stringify(data, undefined, 2))
    }

}

module.exports = new controller()