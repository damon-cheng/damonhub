const Router = require("koa-router");

const momentRouter = new Router({
    prefix: "/moment"
})

const {
    verifyAuth
} = require("../middleware/auth.middleware")

const {
    verifyPermission
} = require("../middleware/auth.middleware")

const {
    verifyLabelExists
} = require("../middleware/label.middleware")

const {
    create,
    update,
    detail,
    list,
    remove,
    addLabel,
    fileInfo
} = require("../controller/moment.controller")

momentRouter.post("/", verifyAuth, create) //发布动态
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update) //修改动态
momentRouter.get("/:momentId", detail) //获取动态(单个)
momentRouter.get("/", list) //获取动态(列表)
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove); //删除动态
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission, verifyLabelExists, addLabel)//给动态添加标签
momentRouter.get("/image/:filename", fileInfo) //动态配图的服务

module.exports = momentRouter;