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
        const shorten_url = generateUrl()
        const long_url = req.body.url
        data[shorten_url] = long_url
        await res.json({shortenUrl:`http://localhost:5000/${shorten_url}`})
    }

    async redirect(req,res) {
        await res.redirect(data[req.params.id])
    }

    async get_all(req,res){
        await res.send(JSON.stringify(data, undefined, 2))
    }
}

module.exports = new controller()