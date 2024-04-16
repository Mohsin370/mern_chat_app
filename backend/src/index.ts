import express, { Express, Request, Response, NextFunction } from "express";
import db from "./config/db/conn";
import routes from "./routes";
import dotenv from 'dotenv';
import path from "path";
import cors from "cors";


const PORT: string | number = process.env.PORT || 5000;
const app: Express = express();
app.use(cors<Request>());


const envFilePath = path.resolve(__dirname, "..", "..", '.env');
dotenv.config({ path: envFilePath });

app.use(express.json({ limit: "50mb" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to chat application!");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.removeHeader('x-powered-by');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});



app.use("/api", routes);

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
});

db().then(() => {
  app.listen(PORT, async () => {
    console.log("Server connected at port: ", PORT);
  });
});
