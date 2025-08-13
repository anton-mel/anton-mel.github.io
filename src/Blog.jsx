import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import Footer from './components/Footer';
import Projects from './components/Projects';

const Blog = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const navigate = useNavigate();

  const handleProjectClick = (project) => {
    console.log('Blog.jsx handleProjectClick called with:', project);
    console.log('Navigating to:', `/blog/${project.blogSlug}`);
    navigate(`/blog/${project.blogSlug}`);
  };

  // Show scroll-to-top button if scrolled more than 0px
  React.useEffect(() => {
    const handleScrollBtn = () => {
      setShowScrollTop(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScrollBtn, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollBtn);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyPGP = () => {
    navigator.clipboard.writeText('4761ECDDC5CCC90BD358773C168630462D227233');
    toast('Copied!');
  };

  return (
    <>
      <div className="app">
        <main className="main-content">
          <div className="content-wrapper">
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

            {/* Projects Section */}
            <section className="main-section" id="projects">
              <div className="resume-header">
                <Link to="/" className="back-link">← Back to Home</Link>
                <h1>Projects & Research</h1>
              </div>
              
              <Projects 
                showFullDescriptions={true} 
                onProjectClick={handleProjectClick} 
                key="blog-projects"
              />
              
              <Footer />
            </section>
          </div>
        </main>
      </div>
      
      {showScrollTop && (
        <button className="scroll-to-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
          <FaArrowUp />
        </button>
      )}
      
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

export default Blog;
