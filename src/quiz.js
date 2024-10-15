import React, { useState, useEffect } from 'react';
import GameOverModal from './components/gameOverModal';
import RulesModal from './components/rulesModal';

function Quiz() {
  const [article, setArticle] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = () => {
    fetch('/api/random-article')
      .then(response => response.json())
      .then(data => setArticle(data))
      .catch(error => console.error('Erreur:', error));
  };

  const handleSubmit = () => {
    if (userAnswer.toLowerCase().trim() === article.title.toLowerCase().trim()) {
      setScore(score + 1);
      setResult({ message: 'Correct!', type: 'success' });
    } else {
      setLives(lives - 1);
      setResult({ message: `Incorrect! La bonne réponse était: ${article.title}`, type: 'error' });
      if (lives - 1 === 0) {
        setGameOver(true);
      }
    }
    setUserAnswer('');
    fetchArticle();
  };

  const handleRestart = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    setResult(null);
    fetchArticle();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && userAnswer.trim() !== '') {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-between p-6 bg-gray-100">
      <div className="absolute top-4 left-4">
        <p>✨Score: {score}</p>
        <p>❤️Vies: {lives}</p>
      </div>
      <div className="absolute top-4 right-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          onClick={() => setShowRules(true)}
        >
          📕Règles
        </button>
      </div>
      {gameOver && <GameOverModal score={score} onRestart={handleRestart} />}
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
      {article ? (
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-2xl font-bold mb-4">Devine l'article Wikipedia</h1>
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: article.extract }}></p>
          </div>
          {result && (
            <div className={`mt-4 p-4 rounded-lg ${result.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {result.message}
            </div>
          )}
        </div>
      ) : (
        <div>Chargement...</div>
      )}
      
      <div className="w-full max-w-3xl">
        <input
          type="text"
          placeholder="Tapez votre réponse ici..."
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="flex justify-center mt-4">
          <button
            className={`bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ${userAnswer.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={userAnswer.trim() === ''}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;