import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }

    const userVerified = await bcrypt.compareSync(password, user.password);
    if (!userVerified) {
      return res.status(400).send({
        success: false,
        message: "Incorrect Password",
      });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: "10h" },
      (err, token) => {
        if (err) throw err;
        return res.status(200).send({
          success: true,
          message: "Login Successfully",
          user:{
            name: user.name,
            email: user.email,
            token,
            id: user.id
          },
        });
      }
    );
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }

    res.status(500).send({
      success: false,
      message: "Login Unsuccessful",
    });
  }
};

const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name, image } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      //check for duplicates
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    user = new User({
      email,
      name,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
      image
    });

    let error = user.validateSync();
    if (error) {
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    console.log(user);
    const payload = { user: { id: user.id } };

    //generate new token for user after signup successfullly.
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).send({
          success: true,
          message: "Signup Successfully"
        });
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }
    res.status(500).send({
      success: false,
      message: "Signup unsuccessful",
      error,
    });
  }
};

const getUsers = async(req: Request, res: Response) => {
  try {
    const users = await User.find({
      _id: { $ne: req.params.id }
    }).select({
      "password":0      //exclude password from selections
    });
    res.status(200).send({
      success: true,
      users
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching users"
    })
  }
}

export { login, signup, getUsers };
