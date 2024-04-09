import express, { Express, Request, Response, NextFunction } from "express";
import db from "./db/conn";

const PORT: string | number = process.env.PORT || 5000;
const app: Express = express();

app.use(express.json({ limit: "50mb" }));
require("dotenv").config();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to chat application!");
});

db().then(() => {
  app.listen(PORT, async () => {
    console.log("Server connected at port: ", PORT);
  });
});
