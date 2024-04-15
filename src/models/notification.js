import Base from "./base";

export default class Notification extends Base {
  /**
   * Gets most recent 25 notifications for a user
   *
   * @param {number} userId The user ID
   * @returns {QueryResult}
   */
  async getNotificationsByUser(userId) {
    const connection = await this.getConnection();

    const [response] = await connection.query(
      `SELECT n.*
      FROM notifications AS n
      JOIN friends AS f ON (n.user_id = f.friend_id OR n.user_id = f.user_id)
      WHERE (f.user_id = '${userId}' OR f.friend_id = '${userId}')
        AND f.status = '2';`
    );

    return response;
  }

  /**
   * Created a notification
   *
   * @param {number} userId The user ID
   * @param {string} notification The notification content
   * @param {number} statusId The status update ID
   * @returns
   */
  async createNotification(userId, notification, statusId = null) {
    const connection = await this.getConnection();

    await connection.query(
      `INSERT INTO notifications (created_at, notification, user_id, status_id) VALUES (NOW(), '${notification}', '${userId}', '${statusId}')`
    );

    return;
  }
}
