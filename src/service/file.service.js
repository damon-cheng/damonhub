const connection = require("../app/database")

class FileSerice {
    async createAvatar(filename, mimetype, size, id) {
        const statement = `
            INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);
        `;
        const [result] = await connection.execute(statement, [filename, mimetype, size, id])
        return result
    }
    async getAvatarByUserId(userId) {
        const statement = `
            SELECT * FROM avatar WHERE user_id = ?;
        `;
        const [result] = await connection.execute(statement, [userId])
        return result[0]
    }
    async createFile(filename, mimetype, size, id, momentId) {
        const statement = `
            INSERT INTO file (filename, mimetype, size, moment_id, user_id) VALUES (?, ?, ?, ?, ?);
        `;
        const [result] = await connection.execute(statement, [filename, mimetype, size, momentId, id])
        return result;
    }
    async getFileByFileName(filename) {
        const statement = `
            SELECT * FROM file WHERE filename = ?; 
        `;
        const [result] = await connection.execute(statement, [filename])
        return result[0]
    }
}

module.exports = new FileSerice()