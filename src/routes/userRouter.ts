import express from "express";
import { validationResult } from "express-validator";
import { User } from "../models/user";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/auth/register", async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: "Validation failed.",
        errors: errors.array(),
      });
    }

    const user = req.body;
    const { username, email, password } = user;
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
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      status: 201,
      success: true,
      message: "User created Successfully.",
      user: {
        id: newUser.id,
        name: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return res.status(500).json({
      status: 500,
      message: `Internal Server Error: ${error.message.toString()}`,
    });
  }
});

export default router;
