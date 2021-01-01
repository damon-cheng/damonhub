const connection = require("../app/database");

class CommentService {
    async create(momentId, content, userId) {
        const statement = `
            INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?); 
        `;
        const [result] = await connection.execute(statement, [content, momentId, userId])
        return result
    }
    async reply(momentId, content, userId, commentId) {
        const statement = `
            INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);
        `;
        const [result] = await connection.execute(statement, [content, momentId, userId, commentId])
        return result
    }
    async update(commentId, content) {
        const statement = `
            UPDATE comment set content = ? WHERE id = ?;
        `;
        const [result] = await connection.execute(statement, [content, commentId])
        return result;
    }
    async remove(commentId) {
        const statement = `
            DELETE FROM comment WHERE id = ?;
        `;
        const [result] = await connection.execute(statement, [commentId])
        return result;
    }
    async list() {
        const statement = `
            SELECT c.id, c.content, c.moment_id, c.user_id, c.comment_id FROM comment c;
        `;
        const [result] = await connection.execute(statement)
        return result
    }
}

module.exports = new CommentService()