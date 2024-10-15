import React from 'react';

function RulesModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Règles du Jeu</h2>
        <p className="mb-4">1. Vous avez 3 vies pour toute la durée de la partie.</p>
        <p className="mb-4">2. Vous gagnez 1 point pour chaque article trouvé.</p>
        <p className="mb-4">3. Si vous échouez à trouver l'article, vous perdez une vie et passez à l'article suivant.</p>
        <p className="mb-4">4. La partie se termine lorsque vous n'avez plus de vies.</p>
        <p className="mb-4">5. Votre score final sera affiché à la fin de la partie.</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

export default RulesModal;