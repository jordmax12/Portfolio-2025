import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { about, projects, contact } from '../data/projects';
import TypingAnimation from './TypingAnimation';
import GameBackground from './GameBackground';

const PortfolioContent = () => {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'projects'
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  // Get unique categories and technologies for filtering
  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const popularTechs = ['AWS Lambda', 'DynamoDB', 'Node.js', 'React', 'TypeScript', 'Python'];
  
  // Filter projects based on selected filter
  const filteredProjects = selectedFilter === 'All' 
    ? projects 
    : projects.filter(project => 
        project.category === selectedFilter || project.tech.includes(selectedFilter)
      );

  const fadeProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  // No need for renderContent function anymore - we'll embed everything directly

  return (
    <div className="relative w-full min-h-screen">
      {/* Game background - only show on home */}
      {currentView === 'home' && <GameBackground />}
      
      <animated.div style={fadeProps} className="relative z-20 w-full min-h-screen pointer-events-none">
        
        {/* Home View */}
        {currentView === 'home' && (
          <>
            {/* Hero Section with integrated content */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pointer-events-auto">
              <div className="max-w-4xl mx-auto">
                {/* Main Title */}
                <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text text-shadow">
                  Jordan Max
                </h1>
                
                {/* Typing Animation */}
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
                  className="text-xl md:text-2xl text-gray-600 mb-8 block"
                />

                {/* About Content - integrated into hero */}
                <div className="max-w-2xl mx-auto mb-8">
                  <p className="text-lg leading-relaxed text-gray-700 mb-6">{about}</p>
                </div>

                {/* Interactive hint and CTA */}
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 italic">
                    Tip: This page is interactive - try using your arrow keys or WASD
                  </p>
                  
                  <button 
                    onClick={() => setCurrentView('projects')}
                    className="clean-button px-8 py-3 font-medium rounded-lg text-lg"
                  >
                    View Recent Work
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Projects View */}
        {currentView === 'projects' && (
          <section className="py-16 pointer-events-auto">
            <div className="max-w-7xl mx-auto px-4">
              {/* Back to Home */}
              <div className="mb-8 text-center">
                <button 
                  onClick={() => setCurrentView('home')}
                  className="clean-button px-6 py-2 font-medium rounded-lg mb-6"
                >
                  ← Back to Home
                </button>
              </div>

              <h2 className="section-title">Recent Projects</h2>
              
              {/* Filter Controls */}
              <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <span className="text-sm text-gray-600 mr-4 py-2">Filter by:</span>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedFilter(category)}
                      className={`tech-tag text-xs ${
                        selectedFilter === category ? 'bg-gray-200 border-gray-400' : ''
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="text-sm text-gray-600 mr-4 py-2">Popular Tech:</span>
                  {popularTechs.map(tech => (
                    <button
                      key={tech}
                      onClick={() => setSelectedFilter(tech)}
                      className={`tech-tag text-xs ${
                        selectedFilter === tech ? 'bg-gray-200 border-gray-400' : ''
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((proj, idx) => (
                  <div key={idx} className="content-panel card-hover">
                    <div className="mb-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {proj.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">{proj.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">{proj.description}</p>
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {proj.tech.map(tech => (
                          <span 
                            key={tech} 
                            className={`tech-tag text-xs cursor-pointer ${
                              selectedFilter === tech ? 'bg-gray-200 border-gray-400' : ''
                            }`}
                            onClick={() => setSelectedFilter(tech)}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" 
                         className="clean-button px-4 py-2 text-sm font-medium flex-1 text-center rounded-lg">
                        View Code
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Show count */}
              <div className="text-center mt-6 text-sm text-gray-500">
                Showing {filteredProjects.length} of {projects.length} projects
              </div>

              {/* Contact info at bottom of projects */}
              <div className="text-center mt-12 pt-8 border-t border-gray-200">
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Email:</span> {contact.email}
                </p>
                <div className="flex gap-4 justify-center">
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" 
                     className="clean-button px-6 py-2 font-medium rounded-lg text-sm">
                    LinkedIn
                  </a>
                  <a href={contact.resume} download 
                     className="clean-button px-6 py-2 font-medium rounded-lg text-sm">
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

      </animated.div>
    </div>
  );
};

export default PortfolioContent;
