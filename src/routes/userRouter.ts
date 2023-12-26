import express from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/auth/register", async (req, res) => {
  try {
    const user = req.body;
    const { name, email, password } = user;

    const isEmailAllReadyExist = await User.findOne({
      email: email,
    });

    if (isEmailAllReadyExist) {
      res.status(400).json({
        status: 400,
        message: "Email already taken. Try another.",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      status: 201,
      success: true,
      message: "User created Successfully.",
      user: newUser,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

export default router;
