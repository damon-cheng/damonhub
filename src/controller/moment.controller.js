const fs = require("fs")

const momentService = require("../service/moment.service")
const fileService = require("../service/file.service")
const { PICTURE_PATH } = require("../constants/file-path")


class MomentController {
    async create(ctx, next) {
        const userId = ctx.user.id;
        const { content } = ctx.request.body;
        const result = await momentService.create(content, userId)
        ctx.body = result
    }
    async update(ctx, next) {
        const { momentId } = ctx.params;
        const { content } = ctx.request.body;
        const result = await momentService.update(content, momentId)
        ctx.body = result
    }
    async detail(ctx, next) {
        const { momentId } = ctx.params;
        const result = await momentService.getMomentById(momentId)
        ctx.body = result;
    }
    async list(ctx, next) {
        const {offset, size} = ctx.query;
        const result = await momentService.getMomentList(offset, size);
        ctx.body = result;
    }
    async remove(ctx, next) {
        const { momentId } = ctx.params;
        const result = await momentService.removeMoment(momentId);
        ctx.body = result;
    }
    async addLabel(ctx, next) {
        const { momentId } = ctx.params;
        const labels = ctx.labels;
        for(let label of labels) {
            const isRe = await momentService.hasLabel(momentId, label.id);
            console.log(isRe)
            if(!isRe) {
                const result = await momentService.addLabel(momentId, label.id);
            }
        }
        ctx.body = "添加成功！"
    }
    async fileInfo(ctx, next) {
        let { filename } = ctx.params;
        const fileInfo = await fileService.getFileByFileName(filename);
        const { type } = ctx.query;
        const types = ["large", "middle", "small"];
        console.log("filename:",filename)
        console.log(types.some(item => item == type))
        if(types.some(item => item == type)) {
            console.log("10")
            filename = filename + "-" + type;
        }
        
        
        console.log("00000000")
        ctx.response.set("content-type", fileInfo.mimetype);
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    }
}

module.exports = new MomentController()