import React from 'react';
import PortfolioContent from './components/PortfolioContent'; // New for overlaid content
import './App.css'; // Import enhanced styles

const App = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      <PortfolioContent />
    </div>
  );
};

export default App;
