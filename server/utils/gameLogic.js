export const rooms = new Map();

const winningPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

export const createRoomState = () => ({
  board: Array(9).fill(""),
  players: [],
  turn: "X",
  status: "waiting",
  winner: null,
  winningPattern: null,
});

export const createOrJoinRoom = (roomId, socketId) => {
  let room = rooms.get(roomId);
  
  if (!room) {
    room = createRoomState();
    rooms.set(roomId, room);
  }

  if (room.players.find(p => p.id === socketId)) {
    return { success: true, room, message: "Already in room" };
  }

  if (room.players.length >= 2) {
    return { success: false, message: "Room is full" };
  }

  // First player is X, second is O
  // Wait, what if X disconnected? We should assign the missing symbol.
  let symbol = "X";
  if (room.players.length === 1) {
    symbol = room.players[0].symbol === "X" ? "O" : "X";
  }

  room.players.push({ id: socketId, symbol });

  if (room.players.length === 2) {
    room.status = "playing";
  }

  return { success: true, room, symbol };
};

export const removePlayer = (socketId) => {
  for (const [roomId, room] of rooms.entries()) {
    const playerIndex = room.players.findIndex(p => p.id === socketId);
    if (playerIndex !== -1) {
      room.players.splice(playerIndex, 1);
      
      if (room.players.length === 0) {
        rooms.delete(roomId);
      } else {
        room.status = "waiting";
        room.winner = null;
        room.winningPattern = null;
        room.board = Array(9).fill("");
        room.turn = "X";
      }
      return { roomId, room };
    }
  }
  return null;
};

export const checkWin = (board) => {
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], pattern };
    }
  }
  if (!board.includes("")) {
    return { winner: "draw", pattern: null };
  }
  return null;
};

export const validateAndMakeMove = (roomId, socketId, index) => {
  const room = rooms.get(roomId);
  if (!room) return { success: false, message: "Room not found" };
  
  if (room.status !== "playing") return { success: false, message: "Game is not active" };
  
  const player = room.players.find(p => p.id === socketId);
  if (!player) return { success: false, message: "Player not in room" };
  
  if (player.symbol !== room.turn) return { success: false, message: "Not your turn" };
  
  if (room.board[index] !== "") return { success: false, message: "Cell is already occupied" };
  
  room.board[index] = player.symbol;
  
  const result = checkWin(room.board);
  if (result) {
    room.status = "finished";
    room.winner = result.winner;
    room.winningPattern = result.pattern;
  } else {
    room.turn = room.turn === "X" ? "O" : "X";
  }
  
  return { success: true, room };
};

export const restartGame = (roomId) => {
  const room = rooms.get(roomId);
  if (!room) return null;
  
  room.board = Array(9).fill("");
  room.status = room.players.length === 2 ? "playing" : "waiting";
  room.winner = null;
  room.winningPattern = null;
  room.turn = "X";
  
  return room;
};
