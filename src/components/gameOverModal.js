import React from 'react';

function GameOverModal({ score, onRestart }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Perdu !</h2>
        <p className="mb-4">Votre score: {score}</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          onClick={onRestart}
        >
          Recommencer
        </button>
      </div>
    </div>
  );
}

export default GameOverModal;