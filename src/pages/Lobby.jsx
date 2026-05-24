import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Hash } from 'lucide-react';

const Lobby = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    if (roomId.trim()) {
      navigate(`/room/${roomId.trim()}`);
    }
  };

  const handleCreateRandom = () => {
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    navigate(`/room/${randomId}`);
  };

  return (
    <div className="sketch-box w-[90%] max-w-md p-8 sm:p-10 flex flex-col gap-8 relative z-10">
      <div className="text-center">
        <h1 className="font-hand text-5xl font-bold mb-2 tracking-wide text-ink drop-shadow-sm">Tic Tac Toe</h1>
        <p className="font-sketch text-muted text-lg">Multiplayer Edition</p>
      </div>

      <form onSubmit={handleJoin} className="flex flex-col gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
            <Hash size={20} />
          </div>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value.toUpperCase())}
            placeholder="ENTER ROOM ID"
            maxLength={10}
            className="w-full pl-10 pr-4 py-3 bg-paper border-2 border-ink rounded-sketch font-sketch text-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors uppercase"
          />
        </div>
        <button 
          type="submit" 
          disabled={!roomId.trim()}
          className="w-full py-3 sketch-box !border-ink !bg-ink !text-white !rounded-sketch font-sketch text-xl uppercase tracking-wider flex items-center justify-center gap-2 hover:!bg-ink/90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-sketch"
        >
          <Play size={20} />
          Join Room
        </button>
      </form>

      <div className="flex items-center justify-center gap-4 text-muted font-sketch">
        <div className="h-[2px] bg-muted/30 flex-1 rounded-full"></div>
        <span>OR</span>
        <div className="h-[2px] bg-muted/30 flex-1 rounded-full"></div>
      </div>

      <button 
        onClick={handleCreateRandom}
        className="w-full py-3 sketch-box font-sketch text-xl uppercase tracking-wider flex items-center justify-center hover:bg-paper"
      >
        Create New Room
      </button>
    </div>
  );
};

export default Lobby;
