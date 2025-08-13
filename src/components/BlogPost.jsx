import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import SidePanel from './SidePanel';
import Footer from './Footer';

const BlogPost = () => {
  const { slug } = useParams();
  const project = projects.find(p => p.blogSlug === slug);

  if (!project) {
    return (
      <div className="app">
        <main className="main-content">
          <div className="content-wrapper">
            <SidePanel />
            <section className="main-section">
              <div className="resume-header">
                <Link to="/blog" className="back-link">← Back to Projects</Link>
                <h1>Project Not Found</h1>
                <p>The requested project could not be found.</p>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <main className="main-content">
        <div className="content-wrapper">
          <SidePanel />
          <section className="main-section">
            <div className="resume-header">
              <Link to="/blog" className="back-link">← Back to Projects</Link>
              <h1>{project.title}</h1>
              <div className="blog-block-meta" style={{ marginTop: '10px' }}>
                {project.period} &nbsp;|&nbsp; {project.technologies}
              </div>
            </div>
            
            <div className="blog-content">
              <div dangerouslySetInnerHTML={{ __html: project.fullDescription }} />
              
              <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
                <h3>Project Links</h3>
                <p>
                  <strong>GitHub Repository:</strong> 
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '8px', color: 'var(--accent)' }}>
                    View on GitHub ↗
                  </a>
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

export default BlogPost;
