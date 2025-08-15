import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import './App.css';
import Footer from './components/Footer';
import Projects from './components/Projects';
import SidePanel from './components/SidePanel';

const Blog = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
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

  // Update top scroll progress bar
  React.useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setScrollProgress(total > 0 ? (current / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
        <header className="header">
          <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
        </header>
        <main className="main-content">
          <div className="content-wrapper">
            <SidePanel />

            {/* Projects Section */}
            <section className="main-section" id="projects">
              <div className="resume-header">
                <Link to="/" className="back-link">← Back to Home</Link>
                <h1>Projects & Research</h1>
              </div>
              
              <Projects 
                showFullDescriptions={false}
                onProjectClick={handleProjectClick} 
                key="blog-projects"
                lineClamp={2}
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
    </>
  );
};

export default Blog;
