import { Router, Request, Response } from "express";
import { User } from "../models/User";

const router = Router();
let users: User[] = [];

//Create new user
router.post("/new", (req: Request, res: Response) => {
  const user: User = {
    id: users.length + 1,
    ci: req.body.ci,
    name: req.body.name,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    house_number: req.body.house_number,
    bills: [],
    assists: [],
  };
  users.push(user);
  res.status(201).json(user);
});

//Get all users

router.get("/", (req: Request, res: Response) => {
  res.json(users);
});

//Get user by id

router.get("/:id", (req: Request, res: Response) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    res.status(404).send("User not found!");
  }
});

// Update user personal information

router.put("/:id/info", (req: Request, res: Response) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    res.status(404).send("User not found!");
  } else {
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.ci = req.body.ci || user.ci;

    res.json(user);
  }
});

// Delete user

router.delete("/:id", (req: Request, res: Response) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (index === -1) {
    res.status(404).send("User not found!");
  } else {
    users.slice(index, 1);
    res.status(204).send();
  }
});
export default router;
