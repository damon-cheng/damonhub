
const jwt = require("jsonwebtoken")
const errorTypes = require("../constants/error-types")
const userService = require("../service/user.service")
const AuthService = require("../service//auth.service")
const md5password = require("../utils/password-handle")
const {PUBLIC_KEY} = require("../app/config")


const verifyLogin = async function(ctx, next) {
    const {name, password} = ctx.request.body;
    if(!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit("error", error, ctx)
    }
    const result = await userService.getUserByName(name)
    const user = result[0];
    if(!result.length) {
        const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
        return ctx.app.emit("error", error, ctx)
    }
    if(md5password(password) !== user.password) {
        const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
        return ctx.app.emit("error", error, ctx);
    }
    ctx.user = user;

    await next()
}

const verifyAuth = async function(ctx, next) {
    const authorization = ctx.headers.authorization;
    if(!authorization) {
        const error = new Error(errorTypes.UNAUTHORIZATION)
        return ctx.app.emit("error", error, ctx);
    }
    const token = authorization.replace("Bearer ", "")
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ["RS256"]
        })
        ctx.user = result;
        console.log("result:", result)
        await next()
    } catch (err) {
        const error = new Error(errorTypes.UNAUTHORIZATION)
        return ctx.app.emit("error", error, ctx);
    }
}

const verifyPermission = async function(ctx, next) {
    const [resourceName] = Object.keys(ctx.params);
    const tableName = resourceName.replace("Id", "");
    const resourceId = ctx.params[resourceName];
    const userId = ctx.user.id;
    try {
        const isPermission = await AuthService.CheckResource(tableName, resourceId, userId);
        console.log("isPermission:", isPermission)
        if(!isPermission) throw new Error();
        await next()
    } catch (err) {
        const error = new Error(errorTypes.UNPERMISSION);
        return ctx.app.emit("error", error, ctx)
    }
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}