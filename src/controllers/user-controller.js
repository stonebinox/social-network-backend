import User from "../models/user";
import { addslashes } from "../helpers/addslashes";

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
    const {
      query: { search },
    } = req;

    if (!search)
      return res.status(400).send({
        success: false,
        error: "Invalid parameters",
      });

    const parsedSearch = addslashes(search).trim();

    if (parsedSearch === "")
      return res.status(400).send({
        success: false,
        error: "Invalid search",
      });

    const user = new User();
    const users = await user.getUsers(search);

    return res.status(200).send({
      success: true,
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

    const parsedUsername = encodeURI(username).toLowerCase(); // basic sanitisation

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

  async getUserById(req, res) {
    const {
      query: { id },
    } = req;

    if (!id)
      return res.status(400).send({
        success: false,
        error: "Invalid user ID",
      });

    const parsedUserId = encodeURI(id);

    const user = new User();
    const userData = await user.getUserById(parsedUserId);

    if (!userData)
      return res.status(400).send({
        success: false,
        error: "No user found",
      });

    return res.status(200).send({
      success: true,
      data: userData,
    });
  }
}
