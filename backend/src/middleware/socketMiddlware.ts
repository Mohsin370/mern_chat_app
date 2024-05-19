import { NextFunction } from "express";

const socketMiddlware = (socket: any, next: NextFunction) => {
  const userId = socket.handshake.auth.userId;
  console.log("userID for registration: ", userId);
  if (!userId) {
    // return next(new Error("invalid_user"));
    socket.disconnect();
    return;
  }
  socket.userId = userId;
  next();
};

export default socketMiddlware;
