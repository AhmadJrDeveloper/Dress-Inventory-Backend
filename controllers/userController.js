// UserController.js
import { db } from "../models/index.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const User = db.Users;
import dotenv from "dotenv";
dotenv.config();

const addUser = async (req, res) => {
  let info = {
    username: req.body.username,
    password: req.body.password,
    user_type: req.body.user_type,
    branch_id: req.body.branch_id,
  };

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(info.password, 10);
    info.password = hashedPassword;

    const user = await User.create(info);
    const token = jwt.sign({ id: user.id }, process.env.SECRET_STRING, {
      expiresIn: process.env.LOGIN_EXPIRES,
    });
    res.status(200).json({
      status: "success",
      token: token,
      data: user,
    });
  } catch (error) {
    console.error("Error creating User:", error);
    res.status(500).send(error.message);
  }
};

// 2. get all Users
const getAllUser = async (req, res) => {
  try {
    // Fetch all users
    let users = await User.findAll({
      include: [{ model: db.Branch, as: "branch" }],
    });

    // Check if there are no users
    if (users.length === 0) {
      res.status(404).send({ message: "No users in the database" });
      return;
    }

    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send(error.message);
  }
};

// 3. get single User
const getOneUser = async (req, res) => {
  let id = req.params.id;
  let user = await User.findOne({
    where: { id: id },
    include: [{ model: db.Branch, as: "branch" }],
  });
  res.status(200).send(user);
};

// 4. update User
const updateUser = async (req, res) => {
  let id = req.params.id;
  const user = await User.update(req.body, { where: { id: id } });
  res.status(200).send(user);
};

// 5. delete User
const deleteUser = async (req, res) => {
  let id = req.params.id;
  await User.destroy({ where: { id: id } });
  res.status(200).send("User deleted");
};

const login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
 
  const user = await User.findOne({ where: { username: username }});
  
  
  if (!user || !(await User.comparePassword(password, user.password))) {
    const error = res
      .status(401)
      .json({ message: "please enter a correct username or password" });
    return next(error);
  }
  const token = jwt.sign({ id: user.id, branch:user.branch_id, username:user.username, type:user.user_type}, process.env.SECRET_STRING, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
  res.cookie('token', token);
  res.status(200).json({ message: "success", token ,user:user });
};
    export { addUser, 
        getAllUser, 
        getOneUser,
        updateUser,
        deleteUser,login };