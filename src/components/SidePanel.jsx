import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const SidePanel = () => {
  const [activeSection, setActiveSection] = useState('about');
  
  const copyPGP = () => {
    navigator.clipboard.writeText('4761ECDDC5CCC90BD358773C168630462D227233');
    toast('Copied!');
  };

  // Scroll handler to detect which section is currently visible
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.main-section');
      const headerHeight = 90; // header + margin safety
      let currentId = 'about';

      sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top <= headerHeight) {
          currentId = sec.id;
        }
      });

      if (currentId !== activeSection) {
        setActiveSection(currentId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Helper function to get active class
  const getActiveClass = (sectionId) => {
    return activeSection === sectionId ? 'active' : '';
  };

  return (
    <>
      <aside className="side-panel">
        <div className="avatar-container">
          <img src="/profile.png" alt="Anton Melnychuk" className="avatar" />
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
              <a href="/#about" className={getActiveClass('about')}>About <span className="dots"></span> <span className="number">#1</span></a>
              <a href="/#publications" className={getActiveClass('publications')}>Recent News <span className="dots"></span> <span className="number">#2</span></a>
              <a href="/blog" className={getActiveClass('projects')}>Projects <span className="dots"></span> <span className="number">#3</span></a>
              <a href="/#courses" className={getActiveClass('courses')}>Courses <span className="dots"></span> <span className="number">#4</span></a>
              <a href="/#volunteering" className={getActiveClass('volunteering')}>Volunteering <span className="dots"></span> <span className="number">#5</span></a>
            </div>
          </div>
        </div>
      </aside>
      
      
    </>
  );
};

export default SidePanel;
