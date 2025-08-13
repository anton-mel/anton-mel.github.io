import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import Footer from './components/Footer';

const Blog = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

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
              
              <div>
                {/* Fast-Raft */}
                <div className="blog-block">
                  <div className="blog-block-content">
                    <div className="blog-block-title">
                      <a href="https://github.com/anton-mel/FastRaft" target="_blank" rel="noopener noreferrer">Faster Reliable Network Consensus for Large & Dynamic Datacenters</a>
                    </div>
                    <div className="blog-block-meta">Nov 2024 – Dec 2024 &nbsp;|&nbsp; Distributed Systems, K8s, Go, AWS, gRPC, Terraform, Chaos Mesh</div>
                    <div>
                      <strong>First open-source implementation of the gRPC-based Fast-Raft protocol</strong>, a hierarchical consensus algorithm optimized for globally distributed highly-dynamic systems like mobile networks. Achieved a 2× speedup and a 5× increase in throughput best-case compared to traditional Raft and Paxos algorithms. Containerized cluster nodes and deployed them on AWS EKS using Terraform across three US regions. Performance improvements and fault tolerance were rigorously evaluated at scale using Chaos Mesh for fault injection and resilience testing.
                    </div>
                  </div>
                </div>

                {/* Rust for Linux */}
                <div className="blog-block">
                  <div className="blog-block-content">
                    <div className="blog-block-title">
                      <a href="https://github.com/anton-mel/linux" target="_blank" rel="noopener noreferrer">Rust for Linux — Adding Rust Driver Support</a>
                    </div>
                    <div className="blog-block-meta">Sep 2024 – Oct 2024&nbsp;|&nbsp; Writing Linux kernel, C-Rust Co-design, Device Drivers, FFI</div>
                    <div>
                      Contributed to the <em>Rust for Linux</em> initiative. Recompiled and set up a custom version of <strong>Linux to support Rust-based kernel drivers,</strong> contributing to the integration of Rust into the Linux kernel, with plans for eventual submission to the Linux Kernel Mailing List (LKML). Allowed system developers to write custom Linux loadable kernel modules for thread-safe file operations, minimizing <code>unsafe</code> blocks while ensuring compatibility with cross-compilation.
                    </div>
                  </div>
                </div>

                {/* WeensyOS-Rust */}
                <div className="blog-block">
                  <div className="blog-block-content">
                    <div className="blog-block-title">
                      <a href="https://github.com/anton-mel/WeensyOS" target="_blank" rel="noopener noreferrer">WeensyOS in Rust</a>
                    </div>
                    <div className="blog-block-meta">May 2024 – Aug 2024 &nbsp;|&nbsp; Operating Systems, Booloader, Rust, Teaching, x86-64</div>
                    <div>
                      <strong>Redesigned core systems curriculum</strong> by re-engineering <em>WeensyOS</em>—a minimalist teaching kernel created by Prof. Eddie Kohler at Harvard and used across 6 Ivy League to teach core OS concepts <strong>(adapted at Yale from Spring 2024).</strong> It runs on bare-metal x86-64 machines (QEMU emulated CPUs) with POSIX compatibility and newly added microkernel design. Rust-WeensyOS aims for a complete segfault-free experience, inspired by Rust OS pioneers like <a href="https://www.redox-os.org/" target="_blank" rel="noopener noreferrer">RedoxOS</a>. Its previous version <strong>presents the first known-to-me attempt</strong> to statically offload major core kernel management services via two foreign function interfaces (FFI), as a proof of concept for the feasibility of transitioning portions of the Linux kernel to Rust.
                    </div>
                  </div>
                </div>
              </div>
              
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
