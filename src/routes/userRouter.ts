import express from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";
const router = express.Router();

router.get("/auth/register", async (_req, res) => {
  res.status(200).send("user registration");
});

router.post("/auth/register", async (req, res) => {
  try {
    const user = req.body;
    const { name, email, password } = user;

    console.log("user is", user);

    const isEmailAllReadyExist = await User.findOne({
      email: email,
    });

    if (isEmailAllReadyExist) {
      res.status(400).json({
        status: 400,
        message: "Email already taken. Try another.",
      });
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("newUser:", newUser);

    return res.status(200).json({
      status: 201,
      success: true,
      message: "User created Successfully.",
      user: newUser,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

export default router;
