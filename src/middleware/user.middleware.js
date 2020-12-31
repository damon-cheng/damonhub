
const errorTypes = require("../constants/error-types")
const userService = require("../service/user.service")
const md5password = require("../utils/password-handle")

const verifyUser = async function(ctx, next) {
    const {name, password} = ctx.request.body;
    if(!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit("error", error, ctx)
    }
    let user = await userService.getUserByName(name);
    if(user.length > 0) {
        const error = new Error(errorTypes.USER_ALREADY_EXISTS)
        return ctx.app.emit("error", error, ctx)
    }
    await next();
}

const handlePassword = async function(ctx, next) {
    const {password} = ctx.request.body;
    ctx.request.body.password = md5password(password)

    await next();
}

module.exports = {
    verifyUser,
    handlePassword
}