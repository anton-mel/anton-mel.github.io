import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidePanel from './components/SidePanel';
import Footer from './components/Footer';

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
          <SidePanel />
          
          {/* Resume Section */}
          <section className="main-section" id="resume">
            <div className="resume-header">
              <Link to="/" className="back-link">← Back to Home</Link>
              <h1>Resume</h1>
              <p style={{fontSize: '13.5px', color: '#666', marginTop: '10px', marginBottom: '0'}}>
                If the resume is not loaded, please reload the page or download using the button below.
              </p>
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
            
            <Footer />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Resume;
