import React from 'react';
import { cn } from '../utils/cn';

const Cell = ({ value, onClick, disabled, index }) => {
  // Adding pseudo-random rotation based on index for the sketchy look
  const rotations = ['rotate-1', '-rotate-1', 'rotate-0', '-rotate-2', 'rotate-2'];
  const baseRotation = rotations[index % rotations.length];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-24 sm:h-32 w-full bg-transparent border-none flex items-center justify-center relative z-20 outline-none transition-all duration-200",
        !disabled && "hover:bg-black/5 rounded-sketch hover:scale-105",
        disabled && "cursor-default"
      )}
    >
      {value && (
        <span 
          className={cn(
            "font-hand text-6xl sm:text-7xl font-bold text-ink animate-sketch",
            baseRotation
          )}
        >
          {value}
        </span>
      )}
    </button>
  );
};

export default Cell;
