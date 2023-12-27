import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../models/user";

// token get middleware
export const getTokenFrom = (request: Request): string | null => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFrom(req);
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    const secret = process.env.SECRET as Secret | undefined;
    if (!secret) {
      return res
        .status(500)
        .json({ error: "Internal server error: Missing JWT secret" });
    }

    const decodedToken = jwt.verify(token, secret) as
      | { id: string }
      | undefined;
    if (!decodedToken || !decodedToken.id) {
      return res.status(401).json({ error: "Token invalid" });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach the user information to the locals property for use in subsequent route handlers
    res.locals.user = user;

    // Continue to the next middleware or route handler
    next();
    return;
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
