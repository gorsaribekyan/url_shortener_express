const {check} = require("express-validator")

class middleware {
    short_my_url() {
        return [
            [check('url', 'this parameter is not be empty').isLength({min:1, max:100})],
            [check('url', 'this text is not a url').isURL()]
        ]
    }


}

module.exports = new middleware()