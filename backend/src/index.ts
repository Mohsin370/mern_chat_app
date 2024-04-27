import express, { Express, Request, Response, NextFunction } from "express";
import db from "./config/db/conn";
import routes from "./routes";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
const { Server } = require("socket.io");
import { createServer } from "node:http";

const PORT: string | number = process.env.PORT || 5000;
const app: Express = express();
app.use(cors<Request>());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const envFilePath = path.resolve(__dirname, "..", "..", ".env");
dotenv.config({ path: envFilePath });

app.use(express.json({ limit: "50mb" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to chat application!");
});

app.use("/api", routes);

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
});

io.on("connection", (socket: any) => {
  console.log("user connected", io.engine.clientsCount);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("send_message", (data: any) => {
    io.emit("receive_message", data);
    // socket.broadcast.emit("receive_message", data);
  });
  socket.on("typing_status", (connversationId: string, status: string) => {
    socket.broadcast.emit("typing_status", connversationId, status);
  });
  socket.on("online", (userId: string) => {
    socket.broadcast.emit("online", userId);
  });
});

db().then(() => {
  server.listen(PORT, async () => {
    console.log("Server connected at port: ", PORT);
  });
});
