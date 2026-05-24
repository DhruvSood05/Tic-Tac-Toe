import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Copy, Check, ArrowLeft, Users, RefreshCw } from 'lucide-react';
import { useGameState } from '../hooks/useGameState';
import Board from '../components/Board';
import { cn } from '../utils/cn';

const GameRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { room, symbol, error, makeMove, restartGame } = useGameState(roomId);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (error) {
    return (
      <div className="sketch-box p-8 text-center max-w-sm w-full relative z-10 flex flex-col items-center">
        <h2 className="font-hand text-3xl font-bold text-red-500 mb-4">Error</h2>
        <p className="font-sketch text-lg mb-6">{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="sketch-box px-6 py-2 flex items-center gap-2 font-sketch text-lg hover:bg-paper"
        >
          <ArrowLeft size={18} /> Back to Lobby
        </button>
      </div>
    );
  }

  if (!room || !symbol) {
    return (
      <div className="font-sketch text-2xl animate-pulse text-ink relative z-10">
        Connecting to room...
      </div>
    );
  }

  const isMyTurn = room.turn === symbol;
  const isWaiting = room.status === 'waiting';
  const isFinished = room.status === 'finished';

  return (
    <div className="w-full max-w-lg flex flex-col gap-6 relative z-10 p-4">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-paper/50 p-4 rounded-sketch border-2 border-ink/20">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-black/5 rounded-full transition-colors self-start sm:self-center"
          title="Leave Room"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex flex-col items-center">
          <div className="font-sketch text-sm text-muted uppercase tracking-wider mb-1 flex items-center gap-2">
            <Users size={16} /> Room ID
          </div>
          <div 
            onClick={copyToClipboard}
            className="flex items-center gap-2 cursor-pointer group px-3 py-1 bg-white border-2 border-ink rounded-xl"
            title="Copy Room ID"
          >
            <span className="font-mono font-bold text-lg">{roomId}</span>
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-muted group-hover:text-ink" />}
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-end self-end sm:self-center">
          <div className="font-sketch text-sm text-muted uppercase tracking-wider mb-1">You Are</div>
          <div className="font-hand text-3xl font-bold leading-none">{symbol}</div>
        </div>
      </div>

      {/* Game Status */}
      <div className="text-center sketch-box p-6 min-h-[140px] flex flex-col items-center justify-center">
        {isWaiting ? (
          <div className="flex flex-col items-center gap-3">
            <div className="relative flex justify-center items-center h-8 w-8">
              <div className="absolute w-full h-full border-4 border-ink/20 border-t-ink rounded-full animate-spin"></div>
            </div>
            <p className="font-sketch text-xl text-muted animate-pulse">Waiting for another player...</p>
          </div>
        ) : isFinished ? (
          <div className="flex flex-col items-center gap-3 w-full animate-sketch">
            <h2 className="font-hand text-4xl font-bold">
              {room.winner === 'draw' ? "It's a Draw!" : `${room.winner} Wins!`}
            </h2>
            <p className="font-sketch text-lg text-muted">
              {room.winner === symbol ? "You won!" : room.winner === 'draw' ? "Good game." : "You lost."}
            </p>
            <button 
              onClick={restartGame}
              className="mt-2 sketch-box px-6 py-2 flex items-center gap-2 font-sketch text-lg !bg-ink !text-white hover:!bg-ink/90"
            >
              <RefreshCw size={18} /> Play Again
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <p className="font-sketch text-lg text-muted">Current Turn</p>
            <h2 className={cn("font-hand text-5xl font-bold transition-colors", isMyTurn ? "text-green-600" : "text-ink")}>
              {room.turn}
            </h2>
            <p className="font-sketch text-md mt-1">
              {isMyTurn ? "It's your turn!" : "Waiting for opponent..."}
            </p>
          </div>
        )}
      </div>

      {/* Game Board */}
      <div className={cn("transition-opacity duration-300", isWaiting && "opacity-50 pointer-events-none")}>
        <Board 
          board={room.board} 
          onMakeMove={makeMove} 
          isMyTurn={isMyTurn}
          gameActive={!isWaiting && !isFinished}
        />
      </div>
    </div>
  );
};

export default GameRoom;
