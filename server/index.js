import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { handleSocketConnection } from "./sockets/socketHandler.js";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins for development
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket) => {
  handleSocketConnection(io, socket);
});

// Basic health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
