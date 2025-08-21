import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ strings, typeSpeed = 100, backSpeed = 50, loop = true, className = "" }) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentString = strings[currentStringIndex];
    let timeout;

    if (isTyping) {
      if (currentText.length < currentString.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentString.slice(0, currentText.length + 1));
        }, typeSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1000);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, backSpeed);
      } else {
        if (loop) {
          const nextIndex = (currentStringIndex + 1) % strings.length;
          setCurrentStringIndex(nextIndex);
          setIsTyping(true);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentStringIndex, isTyping, strings, typeSpeed, backSpeed, loop]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {currentText}
      <span className={`inline-block w-0.5 h-6 bg-current ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  );
};

export default TypingAnimation;
