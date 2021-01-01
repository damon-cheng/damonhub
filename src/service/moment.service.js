const connection = require("../app/database")

class MomentService {
    async create(content, userId) {
        const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
        const [result] = await connection.execute(statement, [content, userId])
        return result
    }
    async update(content, momentId) {
        const statement = `
            UPDATE moment set content = ? WHERE id = ?;
        `;
        const [result] = await connection.execute(statement, [content, momentId])
        return result
    }
    async getMomentById(momentId) {
        const statement =  `
            SELECT m.id, m.content, m.user_id  FROM moment AS m WHERE m.id = ?;
        `;
        const [result] = await connection.execute(statement, [momentId]);
        return result[0]
    }
    async getMomentList(offset, size) {
        const statement = `
            SELECT m.id, m.content, m.user_id FROM moment m LIMIT ?, ?;
        `;
        const [result] = await connection.execute(statement, [offset, size])
        return result;
    }
    async removeMoment(momentId) {
        const statement = `
            DELETE FROM moment WHERE id = ?;
        `;
        const [result] = await connection.execute(statement, [momentId]);
        return result
    }
    async addLabel(momentId, labelId) {
        const statement = `
            INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);
        `;
        const [result] = await connection.execute(statement, [momentId, labelId])
        return result;
    }
    async hasLabel(momentId, labelId) {
        const statement = `
            SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;
        `;
        const [result] = await connection.execute(statement, [momentId, labelId])
        return result[0]
    }
}

module.exports = new MomentService()