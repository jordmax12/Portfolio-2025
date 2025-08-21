import React, { useState } from 'react';
import GameLoader from './components/GameLoader';
import Portfolio from './components/Portfolio';
import { useSpring, animated } from '@react-spring/web';

const App = () => {
  const [loaded, setLoaded] = useState(false);

  const fadeProps = useSpring({
    opacity: loaded ? 1 : 0,
    from: { opacity: 0 },
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {!loaded ? (
        <GameLoader onComplete={() => setLoaded(true)} />
      ) : (
        <animated.div style={fadeProps}>
          <Portfolio />
        </animated.div>
      )}
    </div>
  );
};

export default App;
