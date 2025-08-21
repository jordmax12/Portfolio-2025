import React from 'react';
import { about, projects, skills, contact } from '../data/projects';

const Portfolio = () => (
  <div className="container mx-auto p-4">
    <section id="about" className="mb-8">
      <h1 className="text-4xl font-bold">About Me</h1>
      <p>{about}</p>
    </section>
    <section id="skills" className="mb-8">
      <h2 className="text-2xl font-bold">Skills</h2>
      <ul className="list-disc pl-6">{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
    </section>
    <section id="projects" className="mb-8">
      <h2 className="text-2xl font-bold">Projects</h2>
      {projects.map((proj, idx) => (
        <div key={idx} className="mb-4 p-4 border border-gray-700 rounded">
          <h3 className="text-xl">{proj.title}</h3>
          <p>{proj.description}</p>
          <p>Tech: {proj.tech.join(', ')}</p>
          <a href={proj.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400">Live</a> | 
          <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-400">GitHub</a>
        </div>
      ))}
    </section>
    <section id="contact">
      <h2 className="text-2xl font-bold">Contact</h2>
      <p>Email: {contact.email}</p>
      <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href={contact.resume} download>Resume</a>
    </section>
  </div>
);

export default Portfolio;
