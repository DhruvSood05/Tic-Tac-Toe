import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleSocketConnection } from "./sockets/socketHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve static assets from the React client build directory
app.use(express.static(path.join(__dirname, "../dist")));

// Unmatched routes are directed to the client-side router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

