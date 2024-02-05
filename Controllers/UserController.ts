import { Request, Response } from "express";
import pool from "../db";
import * as queries from "../queries";
import { checkIfExists } from "../Validation";
const getUsers = (req: Request, res: Response) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query(queries.getUserByID, [id]);

    if (results.rows.length > 0) {
      res.status(200).json(results.rows);
    } else {
      res.status(404).send("User doesn't exits!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, lastname, email, password, ci, house_number } = req.body;

    const emailExists = await checkIfExists(
      // Checks email
      queries.checkAttribute("email"),
      email
    );
    if (emailExists) {
      return res.send("Email already exists.");
    }

    const ciExists = await checkIfExists(queries.checkAttribute("ci"), ci); // checks ci
    if (ciExists) {
      return res.send("ci already exists.");
    }

    const houseNumberExists = await checkIfExists(
      // checks house number
      queries.checkAttribute("house_number"),
      house_number
    );
    if (houseNumberExists) {
      return res.send("House number already exists.");
    }

    await pool.query(queries.addUser, [
      // add User
      name,
      lastname,
      email,
      password,
      ci,
      house_number,
    ]);

    res.status(201).send("User created successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const userExits = await checkIfExists(queries.getUserByID, id);
    if (!userExits) {
      res.status(404).send("User doesn't exits !");
    } else {
      await pool.query(queries.deleteUser, [id]);
      res.status(200).send("User deleted successfully!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateUserInfo = async (req: Request, res: Response) => {
  //Updates Basic Information at once
  try {
    const { userid, name, lastname, email, ci, house_number } = req.body;
    const userExits = await checkIfExists(queries.getUserByID, userid);
    if (!userExits) {
      res.status(404).send("User doesn't exits !");
    } else {
      await pool.query(queries.updateUserInfo, [
        name,
        lastname,
        email,
        ci,
        house_number,
        userid,
      ]);
      res.status(200).send("User Information updated successfully!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateUserPass = async (req: Request, res: Response) => {
  //Updates only password
  try {
    const userid = parseInt(req.params.id);
    const userExits = await checkIfExists(queries.getUserByID, userid);
    if (!userExits) {
      res.status(404).send("User doesn't exits !");
    } else {
      const { password } = req.body;
      pool.query(queries.updateUserPass, [password, userid]);
      res.status(200).send("User Password updated successfully!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
export {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUserInfo,
  updateUserPass,
};
