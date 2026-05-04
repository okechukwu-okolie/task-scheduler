import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //testing for presence of username or email
    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUsername) {
      // console.log('username or email already exists')
      return res.status(400).json({
        message: "Username already exists",
      });
    }
    if (existingEmail) {
      return res.status(401).json({
        message: "Email already exists",
      });
    }

    //encrypting the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    //creating a new instance of a user into the database
    const newUser = new User({
      username,
      email,
      password: encryptedPassword,
    });

    await newUser.save();
    console.log("user created successfully");
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status({
      message: "Internal server error",
    });
  }
};

export const userSignIn = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const existingUser = User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    if (!existingUser) {
      return res.status(400).json({
        message: "User does not exist. Please sign up first",
      });
    }

    const token = jwt.sign(
      existingUser._id,
       process.env.jwt_secret_key,
        { expiresIn: "1h"});

    const encryptedPassword = existingUser.password;
    const checkedPassword = await bcrypt.compare(password, encryptedPassword);
    if (!checkedPassword) {
      return res.status(400).json({
        message: "User does not exist. Please sign up first",
      });
    }
    res.status(201).json({
      message: "User successfully logged in.",
    });
  } catch (error) {
    console.log("Internal Error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
