import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authorizeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("token");
    if (token == null) {
      res.status(401).send({
        success: false,
        message: "Login required!",
      });
      return;
    }

    const user = await jwt.verify(token, process.env.JWT_SECRET!);
    if (user) {
      res.locals.user = user;
      next();
    } else {
      res.status(401).send({
        success: false,
        message: "Inavlid token",
      });
    }
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Inavlid token",
    });
  }
};

export { authorizeMiddleware };
