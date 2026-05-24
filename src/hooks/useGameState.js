import { useState, useEffect } from "react";
import { socket } from "../socket/socket";

export const useGameState = (roomId) => {
  const [room, setRoom] = useState(null);
  const [symbol, setSymbol] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    socket.connect();

    if (roomId) {
      socket.emit("joinRoom", { roomId });
    }

    const onRoomUpdated = (updatedRoom) => {
      setRoom(updatedRoom);
    };

    const onPlayerSymbol = (assignedSymbol) => {
      setSymbol(assignedSymbol);
    };

    const onRoomError = (errorMessage) => {
      setError(errorMessage);
    };

    socket.on("roomUpdated", onRoomUpdated);
    socket.on("playerSymbol", onPlayerSymbol);
    socket.on("roomError", onRoomError);

    return () => {
      socket.off("roomUpdated", onRoomUpdated);
      socket.off("playerSymbol", onPlayerSymbol);
      socket.off("roomError", onRoomError);
      socket.disconnect();
    };
  }, [roomId]);

  const makeMove = (index) => {
    socket.emit("makeMove", { roomId, index });
  };

  const restartGame = () => {
    socket.emit("restartGame", { roomId });
  };

  return { room, symbol, error, makeMove, restartGame };
};
