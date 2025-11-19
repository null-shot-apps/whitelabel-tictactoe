'use client';

import { useState } from 'react';

type Player = 'X' | 'O' | null;
type Board = Player[];

export default function DogeTicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winner, setWinner] = useState<Player>(null);
  const [gameOver, setGameOver] = useState(false);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (board: Board): Player => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
      setScores(prev => ({
        ...prev,
        [gameWinner]: prev[gameWinner] + 1
      }));
    } else if (newBoard.every(cell => cell !== null)) {
      setGameOver(true);
      setWinner(null); // tie
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
    resetGame();
  };

  const getStatusMessage = () => {
    if (winner) {
      return winner === 'X' ? 'Much win! Player 1 wins! 🐕' : 'Such victory! Player 2 wins! 🚀';
    }
    if (gameOver) {
      return 'Wow! Much tie! So equal! 🤝';
    }
    return currentPlayer === 'X' ? 'Player 1\'s turn 🎯' : 'Player 2\'s turn 🎮';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">
            🐕 DOGE TIC TAC TOE 🚀
          </h1>
          <p className="text-gray-600 text-sm">Much fun! Very game! Wow!</p>
        </div>

        {/* Score Board */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden border-2 border-orange-300">
                <img 
                  src="https://i.imgur.com/QFMJwGH.png" 
                  alt="Player 1 Doge" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-2xl font-bold text-orange-600">{scores.X}</div>
              <div className="text-sm text-gray-600">Player 1</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-500">VS</div>
              <div className="text-xs">⚡</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden border-2 border-orange-300">
                <img 
                  src="https://i.imgur.com/BQmOvKn.png" 
                  alt="Player 2 Doge" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-2xl font-bold text-orange-600">{scores.O}</div>
              <div className="text-sm text-gray-600">Player 2</div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-gray-700">
            {getStatusMessage()}
          </p>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className={`
                aspect-square rounded-xl border-4 transition-all duration-200 flex items-center justify-center p-2
                ${cell 
                  ? 'bg-gradient-to-br from-orange-200 to-yellow-200 border-orange-300' 
                  : 'bg-white border-gray-300 hover:border-orange-400 hover:bg-orange-50'
                }
                ${!cell && !gameOver ? 'cursor-pointer transform hover:scale-105' : 'cursor-not-allowed'}
              `}
              disabled={!!cell || gameOver}
            >
              {cell === 'X' && (
                <img 
                  src="https://i.imgur.com/QFMJwGH.png" 
                  alt="Doge Player 1" 
                  className="w-full h-full object-contain rounded-lg"
                />
              )}
              {cell === 'O' && (
                <img 
                  src="https://i.imgur.com/BQmOvKn.png" 
                  alt="Doge Player 2" 
                  className="w-full h-full object-contain rounded-lg"
                />
              )}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={resetGame}
            className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 transform hover:scale-105"
          >
            🔄 New Game
          </button>
          <button
            onClick={resetScores}
            className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105"
          >
            🗑️ Reset Scores
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            To the moon! 🌙 Much gaming! Such strategy! Wow!
          </p>
        </div>
      </div>
    </div>
  );
}




