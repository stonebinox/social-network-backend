import Friend from "../models/friend";
import User from "../models/user";

export default class FriendsController {
  async sendRequest(req, res) {
    const {
      query: { userId, friendId },
    } = req;

    if (!userId || !friendId) {
      return res.status(400).send({
        success: false,
        error: "Invalid parameters",
      });
    }

    const user = new User();
    const userData = await user.getUserById(userId);

    if (!userData)
      return res.status(400).send({
        success: false,
        error: "User not found",
      });

    const friendData = user.getUserById(friendId);

    if (!friendData)
      return res.status(400).send({
        success: false,
        error: "Friend not found",
      });

    const friend = new Friend();
    const existingRequestId = await friend.getRequestByUserIds(
      userId,
      friendId
    );

    if (!existingRequestId) {
      await friend.sendRequest(userId, friendId);

      return res.status(200).send({
        success: true,
        data: null,
      });
    }

    return res.status(400).send({
      success: false,
      error: "Request pending confirmation",
    });
  }
}
