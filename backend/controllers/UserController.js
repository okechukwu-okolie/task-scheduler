import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { generateToken } from "../middleware/userMiddleware.js";
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

   
    // await newUser.save();
      const newUser = await User.create({
      username,
      email,
      password: encryptedPassword,
    });

    if (!newUser) {
      return res.status(400).json({
        message: "User creation failed",
      });
    }

    console.log("user created successfully");
    // console.log(newUser)

    res.status(201).json({
      message: "User created successfully",
      token: generateToken(newUser._id),
    });   
    

  } catch (error) {
    console.log(error);
    res.status({
      message: "Internal server error",
    });
  }
};

export const userSignIn = async (req, res) => {

  //destructuring the username or email and password from the request body
  const { identifier, password } = req.body;
   
  //checking if the user exists in the database by either username or email
  try {
    const existingUser = await User.findOne({username: identifier})
    
      //if the user does not exist, return an error message
    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid credentials, provide correct username or email",
      });
    }   

    //appraising the password
    const encryptedPassword = existingUser.password;
    const checkedPassword = await bcrypt.compare(password, encryptedPassword);

    //if the password is incorrect, return an error message
    if (!checkedPassword) {
      return res.status(400).json({
        message: "Invalid credentials, provide correct username or email",
      });
    }

    //here the token is generated and sent to the frontend for user validation and to access protected routes
    console.log(existingUser)
    res.status(201).json({
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      token: generateToken(existingUser._id),
      message: "User successfully logged in.",
    });
    
  } catch (error) {
    console.log("Internal Error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
