import { Request, Response, query } from "express";
import pool from "../db";
import * as queries from "../queries";
import { checkIfExists } from "../Validation";

const getAssists = async (req: Request, res: Response) => {
  try {
    const userid = parseInt(req.params.id);
    const userExits = await checkIfExists(queries.getUserByID, userid);
    if (userExits) {
      const result = await pool.query(queries.getAssists, [userid]);
      res.status(200).json(result.rows);
    } else {
      res.status(404).send("User doesn't exist!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getAssistById = async (req: Request, res: Response) => {
  try {
    const userid = parseInt(req.params.id);
    const assistid = parseInt(req.params.assistid);
    const userExits = await checkIfExists(queries.getUserByID, userid);
    if (!userExits) {
      return res.status(404).send("User doesn't exist!");
    }
    const result = await pool.query(queries.getAssistById, [assistid, userid]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).send("Assist doesn't exist!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const createAssist = async (req: Request, res: Response) => {
  try {
    const userid = parseInt(req.params.id);
    const userExits = await checkIfExists(queries.getUserByID, userid);
    if (!userExits) {
      return res.send("User doesn't exist!");
    }
    const { fecha, tipo_asistencia } = req.body;

    await pool.query(queries.createAssist, [userid, fecha, tipo_asistencia]);
    res.status(201).send("Assist created!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteAssist = async (req: Request, res: Response) => {
  try {
    const userid = parseInt(req.params.id);
    const assistid = parseInt(req.params.assistid);
    const userExits = await checkIfExists(queries.getUserByID, userid);
    if (!userExits) {
      return res.send("User doesn't exist!");
    }
    if (!assistid) {
      return res.send("Assist doesn't exist!");
    }
    await pool.query(queries.deleteAssist, [userid, assistid]);
    res.status(200).send("Assist deleted successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateAssist = async (req: Request, res: Response) => {
  try {
    const userid = parseInt(req.params.id);
    const assistid = parseInt(req.params.assistid);
    const { fecha, tipo_asistencia } = req.body;
    pool.query(queries.updateAssist, [
      userid,
      assistid,
      fecha,
      tipo_asistencia,
    ]);
    res.status(200).send("Bill updated!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
export { getAssists, getAssistById, createAssist, deleteAssist, updateAssist };
