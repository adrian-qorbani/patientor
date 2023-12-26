import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../models/user";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

router.post("/auth/login", async (request: Request, response: Response) => {
  const { username, password } = request.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return response.status(401).json({
        error: "Invalid username or password.",
      });
    }
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return response.status(401).json({
        error: "Invalid username or password.",
      });
    }
    const userForToken = {
      username: user.username,
      id: user._id,
    };
    if (!process.env.SECRET) {
      throw new Error("JWT secret is not defined.");
    }
    const token = jwt.sign(userForToken, process.env.SECRET as Secret);
    return response
      .status(200)
      .json({ token, username: user.username, name: user.username });
  } catch (error) {
    console.error("Error during authentication:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
});

export default router;
