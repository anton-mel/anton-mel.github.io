import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blog from './Blog.jsx'
import BlogPost from './BlogPost.jsx'
import Resume from './Resume.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
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
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
