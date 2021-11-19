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

            var long_url = req.body.url // ֆռոնտից եկած կայքի յղում
            
            const protocol = long_url.match(/^(?:(ht|f)tp(s?)\:\/\/)?/g)[0]
            if(!protocol){
                long_url = "http://" + long_url
            }

            if(long_url.slice(long_url.length-1, long_url.length) !== "/"){
                long_url += "/"
            }

            const long_url_existent = await data.findOne({long_url})
            console.log(long_url_existent)
            if(!long_url_existent){
                const short_url = await generateUrl()


                const result = new data({long_url, short_url})
                await result.save()
                res.json({shortenUrl:`http://localhost:5000/${short_url}`})
                 
            }else{
                res.json({shortenUrl:`http://localhost:5000/${long_url_existent.short_url}`})

            }

        } catch(e){
            console.log(e)
            res.status(400).json({message:"wrong url or try later"})
        }    
    }

    async redirect(req,res) {
        try{
            const url_obj = await data.findOne({short_url:req.params.id})//.short_url
            res.status(301).redirect(url_obj.long_url)        
        } catch(e){
            res.status(404).json({message:"wrong url"})           
        }
    }

    async clear_all(req, res){
        try{
            await data.deleteMany();
            res.send("200 | OK")        
        }catch(error){
            res.status(404).json({message:"oops:("})           
        }
    }
}

module.exports = new controller()