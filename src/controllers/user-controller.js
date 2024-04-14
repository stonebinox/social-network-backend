import User from "../models/user";

export default class UserController {
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

  async getUsers(req, res) {
    const user = new User();
    const users = await user.getUsers();

    return res.status(200).send({
      success: 200,
      data: users,
    });
  }
}
