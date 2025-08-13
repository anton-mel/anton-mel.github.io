import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const SidePanel = () => {
  const copyPGP = () => {
    navigator.clipboard.writeText('4761ECDDC5CCC90BD358773C168630462D227233');
    toast('Copied!');
  };

  return (
    <>
      <aside className="side-panel">
        <div className="avatar-container">
          <img src="public/profile.png" alt="Anton Melnychuk" className="avatar" />
        </div>
        <div className="personal-info">
          <h1>Anton Melnychuk</h1>
          <ul className="description">
            <li>51 Prospect St, New Haven, CT</li>
            <li>anton.melnychuk [at] yale.edu</li>
            <li>Matrix: @an.tony:matrix.org</li>
            <li><a onClick={copyPGP} style={{cursor: 'pointer'}}>Copy my GPG Key 🔐</a></li>
          </ul>
          
          <div>
            <ul className="nav-links">
              <li><a href="https://github.com/anton-mel" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://linkedin.com/in/antonmelnychuk" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="/resume">CV</a></li>
            </ul>
            
            <div className="nav-links-paper">
              <a href="/#about">About <span className="dots"></span> <span className="number">#1</span></a>
              <a href="/#publications">Recent News <span className="dots"></span> <span className="number">#2</span></a>
              <a href="/blog">Projects <span className="dots"></span> <span className="number">#3</span></a>
              <a href="/#courses">Courses <span className="dots"></span> <span className="number">#4</span></a>
              <a href="/#volunteering">Volunteering <span className="dots"></span> <span className="number">#5</span></a>
            </div>
          </div>
        </div>
      </aside>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--accent)',
            color: '#fff',
            fontSize: '13.5px',
            padding: '3px 7px',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }
        }}
      />
    </>
  );
};

export default SidePanel;
