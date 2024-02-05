import { Router, Request, Response } from "express";
import * as controller from "../Controllers/BillController";
const router = Router();

//Get all bills

router.get("/:id/bills", controller.getBills);

//Get bill by id

router.get("/:id/bills/:billid", controller.getBillById);

//Create new Bill

router.post("/:id/bills", controller.createBill);

//Delete Bill

router.delete("/:id/bills/:billid", controller.deleteBill);

//Update Bill

router.put("/:id/bills/:billid", controller.updateBill);

export default router;
