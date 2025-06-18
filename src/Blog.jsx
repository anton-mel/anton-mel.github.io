import React from 'react';

export default function Blog() {
  return (
    <div style={{ 
      maxWidth: 800, 
      margin: '0 auto', 
      padding: '2rem',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      marginTop: '2rem'
    }}>
      <h1 style={{ color: '#008080' }}>🚀 Blog Page</h1>
      <p>Welcome to the blog! Here you will find articles and updates.</p>
      <p><strong>If you can see this, the routing is working correctly!</strong></p>
      <a href="/" style={{ color: '#008080', textDecoration: 'underline' }}>
        ← Back to main page
      </a>
      {/* Add your blog posts here */}
    </div>
  );
}
