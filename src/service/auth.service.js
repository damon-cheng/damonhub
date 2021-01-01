const connection = require("../app/database")

class AuthService {
    async CheckResource(tableName, id, userId) {
        const statement = `
            SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;
        `;
        const [result] = await connection.execute(statement, [id, userId])
        return result.length
    }
}

module.exports = new AuthService()