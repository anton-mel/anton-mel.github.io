import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Resume = () => {
  const [lastChecked, setLastChecked] = useState(new Date());
  const [latestCommit, setLatestCommit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pdfViewerUrl, setPdfViewerUrl] = useState('');
  const [pdfLoadError, setPdfLoadError] = useState(false);

  // Function to check for updates from GitHub
  const checkForUpdates = async () => {
    try {
      // Check the latest commit from your CV repository
      const response = await fetch('https://api.github.com/repos/anton-mel/CV/commits?per_page=1');
      const commits = await response.json();
      
      if (commits.length > 0) {
        const latest = commits[0];
        setLatestCommit({
          sha: latest.sha.substring(0, 7),
          message: latest.commit.message,
          date: new Date(latest.commit.author.date)
        });
      }
      
      setLastChecked(new Date());
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking for updates:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkForUpdates();
    
    // Check for updates every hour
    const interval = setInterval(checkForUpdates, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Function to handle PDF loading
  const loadPdfViewer = () => {
    const pdfUrl = 'https://github.com/anton-mel/CV/raw/main/resume.pdf';
    
    // Try Google Docs viewer first
    const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
    setPdfViewerUrl(googleViewerUrl);
  };

  useEffect(() => {
    loadPdfViewer();
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const copyPGP = () => {
    navigator.clipboard.writeText('4761ECDDC5CCC90BD358773C168630462D227233');
  };

  return (
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
                  <li><a href="https://github.com/anton-mel">GitHub</a></li>
                  <li><a href="https://linkedin.com/in/anton-melnychuk">LinkedIn</a></li>
                  <li><a href="/resume">CV</a></li>
                </ul>
                
                <div className="nav-links-paper">
                  <a href="/#about">About <span className="dots"></span> <span className="number">#1</span></a>
                  <a href="/#publications">Recent News <span className="dots"></span> <span className="number">#2</span></a>
                  <a href="/#projects">Projects <span className="dots"></span> <span className="number">#3</span></a>
                  <a href="/#courses">Courses <span className="dots"></span> <span className="number">#4</span></a>
                  <a href="/#volunteering">Volunteering <span className="dots"></span> <span className="number">#5</span></a>
                </div>
              </div>
            </div>
          </aside>

          {/* Resume Section */}
          <section className="main-section" id="resume">
            <div className="resume-header">
              <Link to="/" className="back-link">← Back to Home</Link>
              <h1>Resume</h1>
            </div>

            {/* PDF Viewer */}
            <div className="pdf-container">
              {pdfViewerUrl ? (
                <iframe
                  src={pdfViewerUrl}
                  title="Anton Melnychuk Resume"
                  width="100%"
                  height="800px"
                  style={{ border: 'none' }}
                  frameBorder="0"
                  onLoad={() => setPdfLoadError(false)}
                  onError={() => setPdfLoadError(true)}
                  id="pdf-iframe"
                />
              ) : (
                <div className="pdf-loading">
                  <p>Loading PDF viewer...</p>
                </div>
              )}
              
              {/* Error message */}
              {pdfLoadError && (
                <div className="pdf-error">
                  <p>
                    PDF viewer failed to load. 
                    <a href="https://github.com/anton-mel/CV/raw/main/resume.pdf" target="_blank">
                      Click here to open the PDF in a new tab
                    </a>
                  </p>
                </div>
              )}
            </div>

            {/* Download and Info Section */}
            <div className="resume-info">
              <a 
                href="https://github.com/anton-mel/CV/raw/main/resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="download-btn"
              >
                Download PDF
              </a>

                <div className="auto-update-info">
                  <h3>Auto-Update Information</h3>
                  
                  <div className="update-details">
                    <p><strong>Last checked:</strong> {formatDate(lastChecked)}</p>
                    {latestCommit && (
                      <p>
                        <strong>Latest commit:</strong> {latestCommit.message} ({formatDate(latestCommit.date)})
                      </p>
                    )}
                  </div>

                  <p>
                    Find the  <a href="https://github.com/anton-mel/CV" target="_blank" rel="noopener noreferrer">source resume</a> in my GitHub repository.
                  </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Resume;
