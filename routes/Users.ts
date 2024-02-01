import { Router} from "express";
import * as controller from "../Controllers/UserController";
const router = Router();

//Get all users

router.get("/", controller.getUsers);

//Get user by id

router.get("/:id", controller.getUserById);

//Create new user

router.post("/", controller.createUser);

// Delete user

router.delete("/:id", controller.deleteUser);

// Update user personal information

router.put("/:id",controller.updateUserInfo);

// Update user password

router.put("/:id/password", controller.updateUserPass);

export default router;
