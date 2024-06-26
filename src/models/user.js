import Base from "./base";

export default class User extends Base {
  async getUser(username) {
    if (!username) return null;
    const connection = await this.getConnection();

    const [response] = await connection.query(
      `SELECT * FROM users WHERE username = '${username}' ORDER BY id ASC LIMIT 1`
    );

    if (response.length === 0) return null;

    return response[0];
  }

  async createUser(username) {
    if (!username) return null;

    const connection = await this.getConnection();

    await connection.query(
      `INSERT INTO users (username, created_at) VALUES ('${username}', NOW())`
    );

    return this.getUser(username);
  }

  async getUsers(search) {
    // typically we'd have a delimiter
    const connection = await this.getConnection();

    const [response] = await connection.query(
      `SELECT * FROM users WHERE status = '1' AND username LIKE '%${search}%' ORDER BY id DESC LIMIT 100`
    );

    return response;
  }

  /**
   * Gets user by user ID
   *
   * @param {number} id
   * @returns {User}
   */
  async getUserById(id) {
    if (!id) return null;

    const connection = await this.getConnection();

    const [response] = await connection.query(
      `SELECT * FROM users WHERE id = '${id}'`
    );

    if (response.length === 0) return null;

    return response[0];
  }
}
