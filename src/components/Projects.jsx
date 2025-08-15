import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { projects } from '../data/projects';

const Projects = ({ showFullDescriptions = false, onProjectClick = null, limit = null, lineClamp = null }) => {
  const navigate = useNavigate();
  
  const handleProjectClick = (project) => {    
    if (project.hasBlogPost) {
      if (onProjectClick) {
        onProjectClick(project);
      } else {
        navigate(`/blog/${project.blogSlug}`);
      }
    }
  };

  return (
    <div>
      {([...projects]
        .sort((a, b) => {
          const da = a.publishedAt || '';
          const db = b.publishedAt || '';
          return db.localeCompare(da);
        })
        .slice(0, limit || projects.length)
      ).map((project) => (
        <div key={project.id} className="blog-block">
          <div className="blog-block-content">
            <div className="blog-block-title">
              {project.hasBlogPost ? (
                <button className="project-title-button" onClick={() => handleProjectClick(project)}>
                  {project.title}
                </button>
              ) : (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-title-link">
                  {project.title}
                </a>
              )}
              {project.hasBlogPost ? (
                <FaExternalLinkAlt className="project-external-icon" />
              ) : (
                <FaGithub className="project-external-icon" />
              )}
            </div>
            <div className="blog-block-meta">
              {project.period} &nbsp;|&nbsp; {project.technologies}
            </div>
            <div>
              {showFullDescriptions ? (
                <div dangerouslySetInnerHTML={{ __html: project.fullDescription }} />
              ) : (
                <div style={lineClamp ? { display: '-webkit-box', WebkitLineClamp: lineClamp, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : undefined}>
                  {project.shortDescription}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
