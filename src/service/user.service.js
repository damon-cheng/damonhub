const connections = require("../app/database")

class UserService {
    async create(name, password) {
        const statement = `INSERT INTO user (name, password) VALUES (?, ?);`
        const result = await connections.execute(statement, [name, password])
        return result[0];
    }
    async getUserByName(name) { 
        const statement = `SELECT * FROM user WHERE name = ?;`
        const result = await connections.execute(statement, [name]);
        return result[0]
        //return result[0].length;
    }
    async updateAvatarUrlById(avatarUrl, id) {
        const statement = `
            UPDATE user SET avatar_url = ? WHERE id = ?; 
        `;
        const [result] = await connections.execute(statement, [avatarUrl, id])
        return result
    }
}


module.exports = new UserService()