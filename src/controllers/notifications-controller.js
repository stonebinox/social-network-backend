import Notification from "../models/notification";

export default class NotificationsController {
  async getNotifications(req, res) {
    const {
      query: { user_id: userId },
    } = req;

    if (!userId)
      return res.status(400).send({
        success: false,
        error: "Invalid session",
      });

    const parsedUserId = encodeURI(userId);
    const notification = new Notification();
    const notificationData = await notification.getNotificationsByUser(
      parsedUserId
    );

    return res.status(200).send({
      success: true,
      data: notificationData,
    });
  }
}
