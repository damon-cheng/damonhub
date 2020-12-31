const Router = require("koa-router")

const AuthRouter = new Router();

const {
    login,
    success
} = require("../controller/auth.controller")

const {
    verifyLogin,
    verifyAuth
} = require("../middleware/auth.middleware")

AuthRouter.post("/login", verifyLogin, login)
AuthRouter.get("/test", verifyAuth, success)

module.exports = AuthRouter;