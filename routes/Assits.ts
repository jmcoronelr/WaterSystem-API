import { Router, Request, Response } from "express";
import * as controller from "../Controllers/AssistController";
const router = Router();

//Get all Assists

router.get("/:id/assists", controller.getAssists);

//Get Assists by id

router.get("/:id/assists/:assistid", controller.getAssistById);

//Create new Assist

router.post("/:id/assists", controller.createAssist);

//Delete Assists

router.delete("/:id/assists/:assistid", controller.deleteAssist);

//Update Assist

router.put("/:id/assists/:assistid", controller.updateAssist);

export default router;
