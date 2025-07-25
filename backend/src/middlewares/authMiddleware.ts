import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: "login first" });
  }
  const token = req.headers.authorization.split(" ")[0];
  if (!token) return res.status(401).json({ error: "Access denied" });
  console.log(token);

  try {
    const decoded = jwt.verify(token, "your-secret-key");

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

export default verifyToken;
