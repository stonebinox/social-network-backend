import { addslashes } from "../helpers/addslashes";
import StatusUpdate from "../models/status-update";

export default class StatusUpdatesController {
  /**
   * Gets a status update
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async getStatusUpdate(req, res) {
    const {
      query: { id },
    } = req;

    if (!id)
      return res.status(400).send({
        success: false,
        error: "Invalid status update ID",
      });

    const parsedId = encodeURI(id);

    const statusUpdate = new StatusUpdate();
    const updateData = await statusUpdate.getStatusUpdate(parsedId);

    if (!updateData)
      return res.status(400).send({
        success: false,
        error: "No status update found",
      });

    return res.status(200).send({
      success: true,
      data: updateData,
    });
  }

  /**
   * Posts a status update
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async postStatusUpdate(req, res) {
    const {
      query: { user_id: userId, description },
    } = req;

    if (!userId)
      return res.status(400).send({
        success: false,
        error: "Invalid session",
      });

    const parsedUserId = encodeURI(userId);

    if (!description)
      return res.status(400).send({
        success: false,
        error: "Invalid description",
      });

    const parsedDescription = addslashes(description).trim();

    if (description === "")
      return res.status(400).send({
        success: false,
        error: "Invalid description",
      });

    const statusUpdate = new StatusUpdate();
    await statusUpdate.createStatusUpdate(parsedUserId, parsedDescription);

    return res.status(200).send({
      success: true,
      data: null,
    });
  }

  /**
   * Gets all status updates by a user
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async getStatusUpdatesByUser(req, res) {
    const {
      query: { user_id: userId },
    } = req;

    if (!userId)
      return res.status(400).send({
        success: false,
        error: "Invalid session",
      });

    const parsedUserId = encodeURI(userId);

    const statusUpdate = new StatusUpdate();
    const statusData = await statusUpdate.getStatusByUser(parsedUserId);

    return res.status(200).send({
      success: true,
      data: statusData,
    });
  }
}
