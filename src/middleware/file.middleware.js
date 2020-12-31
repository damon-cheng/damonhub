const path = require("path")

const Multer = require("koa-multer")
const Jimp = require("jimp")

const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file-path") 

const avatarUpload = Multer({
    dest: AVATAR_PATH
})

const pictureUpload = Multer({
    dest: PICTURE_PATH
})

const avatarHandler = avatarUpload.single("avatar")

const pictureHandler = pictureUpload.array("picture", 10);

const pictureResize = async function(ctx, next) {
    try {
        const {files} = ctx.req;

        for(let file of files) {
            const destPath = path.join(file.destination, file.filename);
            Jimp.read(file.path).then(image => {
                image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);
                image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
                image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
            })
        }

        await next();
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    avatarHandler,
    pictureHandler,
    pictureResize
}