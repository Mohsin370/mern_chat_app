import express, { Express } from "express";
const app: Express = express();

import authRoutes from "./user";
import messagesRoutes from "./message";
import groupsRoutes from "./group";
import conversationRoutes from "./conversation";

app.use("/user", authRoutes);
app.use("/message", messagesRoutes);
app.use("/group", groupsRoutes);
app.use("/conversations", conversationRoutes);

export default app;
