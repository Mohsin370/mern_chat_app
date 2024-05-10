import express, { Express, Request, Response, NextFunction } from "express";
import db from "./config/db/conn";
import routes from "./routes";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
const { Server } = require("socket.io");
import { createServer } from "node:http";
import socketIO from "./socket/socket";
import socketMiddlware from "./middleware/socketMiddlware";

const PORT: string | number = process.env.PORT || 5000;
const app: Express = express();
app.use(cors<Request>());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.use(socketMiddlware, socketIO(io));

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

db().then(() => {
  server.listen(PORT, async () => {
    console.log("Server connected at port: ", PORT);
  });
});
