const fs = require("fs")
const fileService = require("../service/file.service")
const userService = require("../service/user.service")
const { AVATAR_PATH } = require("../constants/file-path")
class UserController {
    async create(ctx, next) {
        const {name, password} = ctx.request.body;
        const result = await userService.create(name, password);
        ctx.body = result;
    }
    async avatarInfo(ctx, next) {
        const { userId } = ctx.params;
        const avatarInfo = await fileService.getAvatarByUserId(userId);
        ctx.response.set("content-type", avatarInfo.mimetype);
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
    }
}

module.exports = new UserController()