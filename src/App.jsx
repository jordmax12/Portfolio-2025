import React from 'react';
import GameBackground from './components/GameBackground'; // Renamed from GameLoader
import PortfolioContent from './components/PortfolioContent'; // New for overlaid content
import './App.css'; // Import enhanced styles

const App = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <GameBackground />
      <PortfolioContent />
    </div>
  );
};

export default App;
