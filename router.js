const Router = require("express")
const controller = require("./controller.js")
const path = require("path")
const middleware = require("./middleware.js")
const router = new Router()


router.get("/", (req,res) => {
    res.sendFile(path.resolve("public/index.html"))
})

router.get("/clear_all", controller.clear_all)

router.post("/short-my-url", middleware.short_my_url(), controller.short_my_url)

router.get("/:id", controller.redirect)

module.exports = router;

