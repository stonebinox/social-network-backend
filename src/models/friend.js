import Base from "./base";

export default class Friend extends Base {
  /**
   * Sends a friend request
   *
   * @param {number} userId The logged in user
   * @param {number} friendId The potential friend
   * @returns
   */
  async sendRequest(userId, friendId) {
    const connection = await this.getConnection();

    await connection.query(
      `INSERT INTO friends (user_id, friend_id, created_at) VALUES ('${userId}', '${friendId}', NOW())`
    );

    return;
  }

  /**
   * Gets an existing friend request based on user IDs
   *
   * @param {number} userId The currently logged in user
   * @param {number} friendId The potential friend
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

  /**
   * Gets an active request by ID
   *
   * @param {number} id
   * @returns {Friend}
   */
  async getRequestById(id) {
    const connection = await this.getConnection();
    const [response] = await connection.query(
      `SELECT * FROM friends WHERE id = '${id}' AND status = '1'`
    );

    if (response.length === 0) return null;

    return response;
  }

  /**
   * Accepts a friend request by friend request ID
   *
   * @param {number} id The request ID
   * @returns
   */
  async acceptFriendRequest(id) {
    const connection = await this.getConnection();
    await connection.query(
      `UPDATE friends SET status = '2', updated_at = NOW() WHERE id = '${id}'`
    );

    return true;
  }

  /**
   * Rejects a friend request by friend request ID
   *
   * @param {number} id The request ID
   * @returns
   */
  async rejectFriendRequest(id) {
    const connection = await this.getConnection();
    await connection.query(
      `UPDATE friends SET status = '0', updated_at = NOW() WHERE id = '${id}'`
    );

    return true;
  }

  /**
   * Gets a user's friends sorted by most recent
   *
   * @param {number} userId
   * @returns {Friend[]}
   */
  async getFriends(userId) {
    const connection = await this.getConnection();

    const [friends] = await connection.query(
      `SELECT * FROM friends WHERE (user_id = '${userId}' OR friend_id = '${userId}') AND status = '2' ORDER BY id DESC LIMIT 25`
    );

    return friends;
  }
}
