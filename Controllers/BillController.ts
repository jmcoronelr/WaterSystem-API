import { Request, Response, query } from "express";
import pool from "../db";
import * as queries from "../queries";
import { checkIfExists } from "../Validation";
const getBills = async (req: Request, res: Response) => {
  try {
    const userid = parseInt(req.params.id);
    const userExits = await checkIfExists(queries.getUserByID, userid); //Checks user
    if (userExits) {
      const results = await pool.query(queries.getBills, [userid]);
      res.status(200).json(results.rows);
    } else {
      res.status(404).send("User doesn't exits!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getBillById = async (req: Request, res: Response) => {
  try {
    const userid = parseInt(req.params.id);
    const billid = parseInt(req.params.billid);
    const userExits = await checkIfExists(queries.getUserByID, userid); //Checks user
    if (!userExits) {
      return res.status(404).send("User doesn't exists!");
    }
    const result = await pool.query(queries.getBillById, [billid, userid]);
    if (result.rows.length > 0) {
      // Checks bill
      res.status(200).json(result.rows);
    } else {
      res.status(404).send("Bill doesn't exists!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const createBill = (req: Request, res: Response) => {
  try {
    const userid = parseInt(req.params.id);
    const { date, status, amount } = req.body;
    pool.query(queries.createBill, [userid, date, status, amount]);
    res.status(200).send("Bill created successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteBill = async (req: Request, res: Response) => {
  try {
    const userid = parseInt(req.params.id);
    const billid = parseInt(req.params.billid);
    const userExits = await checkIfExists(queries.getUserByID, userid); //Checks user
    if (userExits) {
      await pool.query(queries.deleteBill, [userid, billid]);
      res.status(200).send("Bill deleted successfully!");
    } else {
      res.status(404).send("User doesn't exits!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const updateBill = (req: Request, res: Response) => {
  try {
    const userid = parseInt(req.params.id);
    const billid = parseInt(req.params.billid);
    const { date, status, amount } = req.body;
    pool.query(queries.updateBill, [userid, billid, date, status, amount]);
    res.status(200).send("Bill updated!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
export { getBills, getBillById, createBill, deleteBill, updateBill };
