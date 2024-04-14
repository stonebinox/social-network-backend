export default class Friend extends Base {
  /**
   * Sends a friend request
   *
   * @param {number} userId
   * @param {number} friendId
   * @returns
   */
  async sendRequest(userId, friendId) {
    const connection = await this.getConnection();

    await connection.query(
      `INSERT INTO friends (user_id, friend_id, created_at) VALUES (${userId}', '${friendId}', NOW())`
    );

    return;
  }

  /**
   * Gets an existing friend request based on user IDs
   *
   * @param {number} userId
   * @param {number} friendId
   * @returns {number | null}
   */
  async getRequestByUserIds(userId, friendId) {
    const connection = await this.getConnection();
    const [response] = await connection.query(
      `SELECT id FROM friends WHERE (user_id = '${userId}' AND friend_id = '${friendId}') OR (user_id = '${friendId}' AND friend_id = '${userId}') AND status = '1' ORDER BY id DESC LIMIT 1`
    );

    if (response.length === 0) return null;

    return response;
  }
}
