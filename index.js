import express from "express";
import cors from "cors";

import UserController from "./src/controllers/user-controller";
import FriendsController from "./src/controllers/friends-controller";
import StatusUpdatesController from "./src/controllers/status-updates-controller";
import NotificationsController from "./src/controllers/notifications-controller";

const app = express();
const port = 3000;
const userController = new UserController();
const friendsController = new FriendsController();
const statusUpdatesController = new StatusUpdatesController();
const notificationsController = new NotificationsController();

app.use(cors());
app.post("/user", userController.createOrlogin.bind(userController));
app.get("/users", userController.getUsers.bind(userController));
app.get("/user", userController.getUser.bind(userController));

app.post("/friend", friendsController.sendRequest.bind(friendsController));
app.post(
  "/friend/accept",
  friendsController.acceptRequest.bind(friendsController)
);
app.post(
  "/friend/reject",
  friendsController.rejectRequest.bind(friendsController)
);
app.get("/friends", friendsController.getFriends.bind(friendsController));

app.get(
  "/status",
  statusUpdatesController.getStatusUpdate.bind(statusUpdatesController)
);
app.post(
  "/status",
  statusUpdatesController.postStatusUpdate.bind(statusUpdatesController)
);
app.get(
  "/status/user",
  statusUpdatesController.getStatusUpdatesByUser.bind(statusUpdatesController)
);

app.get(
  "/notifications",
  notificationsController.getNotifications.bind(notificationsController)
);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

export default app;
