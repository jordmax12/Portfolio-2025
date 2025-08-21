import React, { useState } from 'react';
import { useSpring, animated, useTransition } from '@react-spring/web';
import { about, skills, projects, contact } from '../data/projects'; // From old repo inspiration
import TypingAnimation from './TypingAnimation';

const PortfolioContent = () => {
  const [activeTab, setActiveTab] = useState('about');

  const fadeProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const contentTransition = useTransition(activeTab, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
    config: { tension: 300, friction: 30 },
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="max-w-4xl mx-auto text-center">
            <div className="gaming-border rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-cyan-400 tracking-wide">BACKEND ENGINEER</h2>
              <p className="text-lg leading-relaxed text-gray-300">{about}</p>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="max-w-5xl mx-auto">
            <div className="gaming-border rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400 tracking-wide">TECHNICAL EXPERTISE</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {skills.map((skill, idx) => (
                  <div key={skill} className="gaming-button p-4 text-center">
                    <span className="font-semibold text-sm tracking-wide">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'recent-work':
        return (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400 tracking-wide">SERVERLESS PROJECTS</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div key={idx} className="gaming-border rounded-lg p-6 card-hover">
                  <h3 className="text-xl font-bold mb-3 text-cyan-300 tracking-wide">{proj.title.toUpperCase()}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm">{proj.description}</p>
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {proj.tech.map(tech => (
                        <span key={tech} className="gaming-button px-3 py-1 text-xs font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" 
                       className="gaming-button px-4 py-2 text-sm font-bold tracking-wide flex-1 text-center">
                      VIEW CODE
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="gaming-border rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-cyan-400 tracking-wide">CONTACT</h2>
              <div className="space-y-6">
                <div className="gaming-button p-4">
                  <p className="text-lg"><span className="font-bold text-cyan-300">EMAIL:</span> {contact.email}</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" 
                     className="gaming-button px-6 py-3 font-bold tracking-wide">
                    LINKEDIN
                  </a>
                  <a href={contact.resume} download 
                     className="gaming-button px-6 py-3 font-bold tracking-wide">
                    RESUME
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <animated.div style={fadeProps} className="relative z-20 w-full h-full p-4 pointer-events-none">
      {/* Navigation */}
      <nav className="flex justify-center space-x-2 md:space-x-4 mb-8 pointer-events-auto">
        {[
          { key: 'about', label: 'ABOUT' },
          { key: 'skills', label: 'SKILLS' },
          { key: 'recent-work', label: 'PROJECTS' },
          { key: 'contact', label: 'CONTACT' }
        ].map(({ key, label }) => (
          <button 
            key={key}
            onClick={() => setActiveTab(key)} 
            className={`px-6 py-3 font-bold text-sm tracking-wider gaming-button ${
              activeTab === key ? 'active' : ''
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
      
      {/* Header Section - Only show when on 'about' tab */}
      {activeTab === 'about' && (
        <section className="text-center mb-8 pointer-events-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text text-shadow">
            Jordan Max
          </h1>
          <TypingAnimation 
            strings={[
              'Backend Engineer',
              'Serverless Architect', 
              'AWS Specialist',
              'Cloud Native Developer',
              'Infrastructure Engineer'
            ]}
            typeSpeed={80}
            backSpeed={40}
            className="text-xl md:text-2xl text-cyan-300 mb-4 text-shadow block"
          />
          <p className="text-lg text-gray-400">Backend Engineer | Serverless Architecture | AWS Cloud Solutions</p>
          <p className="text-sm text-gray-500 mt-2">Use WASD or Arrow Keys to play the background game!</p>
        </section>
      )}
      
      {/* Content with smooth transitions */}
      <section className="pointer-events-auto">
        {contentTransition((style, item) => (
          <animated.div style={style} className="w-full">
            {renderContent()}
          </animated.div>
        ))}
      </section>
    </animated.div>
  );
};

export default PortfolioContent;
