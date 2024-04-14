import express, { Express } from "express";
const app: Express = express();

import  authRoutes  from "./user";
import  messagesRoutes  from "./message";
import  groupsRoutes  from "./group";

app.use("/user", authRoutes);
app.use("/message", messagesRoutes);
app.use("/group", groupsRoutes);

export default app;
