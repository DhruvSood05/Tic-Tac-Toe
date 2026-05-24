import { io } from "socket.io-client";

// In production, this would be your deployed backend URL
// Uses environment variable or falls back to localhost
const SERVER_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const socket = io(SERVER_URL, {
  autoConnect: false, // We'll manually connect when needed
});
