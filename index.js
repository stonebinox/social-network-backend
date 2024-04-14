import express from "express";
import cors from "cors";

import UserController from "./src/controllers/user-controller";

const app = express();
const port = 3000;
const userController = new UserController();

app.use(cors());
app.post("/user", userController.createOrlogin.bind(userController));
app.get("/users", userController.getUsers.bind(userController));

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

export default app;
