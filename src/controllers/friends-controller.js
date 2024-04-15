import Friend from "../models/friend";
import User from "../models/user";

export default class FriendsController {
  /**
   * Handles sending a friend request
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async sendRequest(req, res) {
    const {
      query: { user_id: userId, friend_id: friendId },
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

  /**
   * Handles accepting a friend request
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async acceptRequest(req, res) {
    const {
      query: { request_id: requestId },
    } = req;

    const parsedId = encodeURI(requestId);
    const friend = new Friend();
    const request = await friend.getRequestById(parsedId);

    if (!request)
      return res.status(400).send({
        success: false,
        error: "Friend request not found",
      });

    await friend.acceptFriendRequest(parsedId);

    return res.status(200).send({
      success: true,
      data: null,
    });
  }

  /**
   * Handles rejecting a friend request
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async rejectRequest(req, res) {
    const {
      query: { request_id: requestId },
    } = req;

    const parsedId = encodeURI(requestId);
    const friend = new Friend();
    const request = await friend.getRequestById(parsedId);

    if (!request)
      return res.status(400).send({
        success: false,
        error: "Friend request not found",
      });

    await friend.rejectFriendRequest(parsedId);

    return res.status(200).send({
      success: true,
      data: null,
    });
  }

  /**
   * Gets a user's friends
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async getFriends(req, res) {
    const {
      query: { user_id: userId },
    } = req;

    if (!userId)
      return res.status(400).send({
        success: false,
        error: "Invalid user ID",
      });

    const parsedUserId = encodeURI(userId);

    const friend = new Friend();
    const friends = await friend.getFriends(parsedUserId);

    return res.status(200).send({
      success: true,
      data: friends,
    });
  }

  /**
   * Gets an existing friend request if it exists
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async getFriendship(req, res) {
    const {
      query: { user_id: userId, friend_id: friendId },
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
      return res.status(200).send({
        success: true,
        data: null,
      });
    }

    const data = await friend.getRequestById(existingRequestId.id);

    return res.status(200).send({
      success: true,
      data,
    });
  }
}
