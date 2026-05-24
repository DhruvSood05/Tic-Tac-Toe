import {
  createOrJoinRoom,
  removePlayer,
  validateAndMakeMove,
  restartGame,
} from "../utils/gameLogic.js";

export const handleSocketConnection = (io, socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("joinRoom", ({ roomId }) => {
    if (!roomId) return;

    const result = createOrJoinRoom(roomId, socket.id);

    if (!result.success) {
      socket.emit("roomError", result.message);
      return;
    }

    socket.join(roomId);
    
    // Send the symbol to the player who just joined
    if (result.symbol) {
      socket.emit("playerSymbol", result.symbol);
    }

    // Broadcast the updated room state to everyone in the room
    io.to(roomId).emit("roomUpdated", result.room);
  });

  socket.on("makeMove", ({ roomId, index }) => {
    const result = validateAndMakeMove(roomId, socket.id, index);
    
    if (result.success) {
      io.to(roomId).emit("roomUpdated", result.room);
    } else {
      // Could send an error back to the specific player, but usually we just ignore invalid moves
      console.log(`Invalid move by ${socket.id}: ${result.message}`);
    }
  });

  socket.on("restartGame", ({ roomId }) => {
    const room = restartGame(roomId);
    if (room) {
      io.to(roomId).emit("roomUpdated", room);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    const result = removePlayer(socket.id);
    
    if (result) {
      const { roomId, room } = result;
      // Tell the remaining player(s) the room state has changed
      io.to(roomId).emit("roomUpdated", room);
      io.to(roomId).emit("playerLeft");
    }
  });
};
