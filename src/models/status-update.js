import Base from "./base";

export default class StatusUpdate extends Base {
  /**
   * gets a status update by ID
   *
   * @param {number} id
   * @returns {StatusUpdate | null}
   */
  async getStatusUpdate(id) {
    const connection = await this.getConnection();

    const [status] = await connection.query(
      `SELECT * FROM status_updates WHERE id = '${id}' AND status = '1' ORDER BY id DESC LIMIT 1`
    );

    if (status.length === 0) return null;

    return status;
  }

  /**
   * Gets all status updates by a user
   *
   * @param {number} userId
   * @returns {StatusUpdate[]}
   */
  async getStatusByUser(userId) {
    const connection = await this.getConnection();

    const [status] = await connection.query(
      `SELECT * FROM status_updates WHERE user_id = '${userId}' AND status = '1' ORDER BY id DESC LIMIT 100`
    );

    return status;
  }

  /**
   * Creates a status update for a user
   *
   * @param {number} userId
   * @param {string} text
   * @returns
   */
  async createStatusUpdate(userId, text) {
    const connection = await this.getConnection();

    await connection.query(
      `INSERT INTO status_updates (user_id, created_at, description) VALUES ('${userId}', NOW(), '${text}')`
    );

    return;
  }
}
