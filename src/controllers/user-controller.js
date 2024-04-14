import User from "../models/user";

export default class UserController {
  /**
   * Creates or returns user info
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async createOrlogin(req, res) {
    const {
      query: { username = null },
    } = req;

    if (!username)
      return res.status(400).send({
        success: false,
        error: "Invalid username",
      });

    if (username.toLowerCase().trim() === "")
      return res.status(400).send({
        success: false,
        error: "Invalid username",
      });

    const parsedUsername = encodeURI(username).toLowerCase(); // basic sanotisation

    const user = new User();
    let userData = await user.getUser(parsedUsername);

    if (!userData) {
      userData = await user.createUser(parsedUsername);
    }

    return res.status(200).send({
      sucess: true,
      data: userData,
    });
  }

  /**
   * Gets all users
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async getUsers(req, res) {
    const user = new User();
    const users = await user.getUsers();

    return res.status(200).send({
      success: 200,
      data: users,
    });
  }

  /**
   * Gets a user
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Response}
   */
  async getUser(req, res) {
    const {
      query: { username = null },
    } = req;

    if (!username)
      return res.status(400).send({
        success: false,
        error: "Invalid username",
      });

    const parsedUsername = encodeURI(username).toLowerCase(); // basic sanotisation

    const user = new User();
    let userData = await user.getUser(parsedUsername);

    if (!userData) {
      return res.status(400).send({
        success: false,
        error: "No user found",
      });
    }

    return res.status(200).send({
      success: true,
      data: userData,
    });
  }
}
