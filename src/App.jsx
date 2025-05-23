import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { FaMapMarkerAlt, FaUniversity, FaUserTie, FaBuilding, FaEnvelope, FaGithub, FaLinkedin, FaSun, FaMoon } from 'react-icons/fa'

function App() {
  const [isDarkMode, setIsDarkMode]   = useState(true);
  const [scrollProgress, setProgress] = useState(0);
  const [activeSection, setActive]    = useState('about');
  const [showMoreProjects, setShowMoreProjects] = useState(false);

  /* ------------- theme toggle ------------- */
  useEffect(() => {
    document.documentElement.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  /* ------------- scroll handler (progress bar + active tab) ------------- */
  const handleScroll = useCallback(() => {
    const total   = document.documentElement.scrollHeight - window.innerHeight;
    const current = window.scrollY;
    setProgress((current / total) * 100);

    /* figure out which .main-section is currently near the top */
    const sections = document.querySelectorAll('.main-section');
    const headerH  = 90;                       // header + margin safety
    let currentId  = activeSection;

    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= headerH) currentId = sec.id;  // last one that passed the header
    });

    if (currentId !== activeSection) setActive(currentId);
  }, [activeSection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ------------- helpers ------------- */
  const toggleTheme   = () => setIsDarkMode(!isDarkMode);
  const navClick = id => e => {
    e.preventDefault();                       // stop default anchor jump
    setActive(id);                            // mark link active now

    const el = document.getElementById(id);
    if (!el) return;

    const offset   = 80;                      // ↓ your desired clearance
    const yPos     = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: yPos, behavior: 'smooth' });

    // keep hash in the address bar so the page can be shared / refreshed
    history.replaceState(null, '', `#${id}`);
  };
  

  return (
    <>
      <div className="app">
        <header className="header">
          <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
          <div className="header-content">
            <a href="/" className="name">Academic Profile</a>
            <nav className="navigation">
              <a href="#about"        onClick={navClick('about')}        className={activeSection==='about'        ? 'active' : ''}>about</a>
              <a href="#publications" onClick={navClick('publications')} className={activeSection==='publications' ? 'active' : ''}>publications</a>
              <a href="#projects"     onClick={navClick('projects')}     className={activeSection==='projects'     ? 'active' : ''}>projects</a>
              <a href="#courses"      onClick={navClick('courses')}      className={activeSection==='courses'      ? 'active' : ''}>courses</a>

              <button className="theme-toggle" onClick={toggleTheme}>
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>
            </nav>
          </div>
        </header>
        <main className="main-content">
          <div className="content-wrapper">
            <aside className="side-panel">
              <div className="avatar-container">
                <img src="/profile.png" alt="Anton Melnychuk" className="avatar" />
              </div>
              <div className="personal-info">
                <h1>Anton Melnychuk</h1>
                <p className="description">
                  I am a rising senior at Yale University from Ukraine, studying Electrical Engineering and Computer Science.
                </p>
                <div className="contact-info">
                  <div className="info-item">
                    <FaMapMarkerAlt className="icon" />
                    <a
                      href="https://www.google.com/maps/place/Arthur+K.+Watson+Hall,+51+Prospect+St,+New+Haven,+CT+06511"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      51 Prospect St, New Haven CT
                    </a>
                  </div>
                  <div className="info-item">
                    <FaUniversity className="icon" />
                    <a href="https://www.yecl.org/" target="_blank" rel="noopener noreferrer">
                      Efficient Computing Lab
                    </a>
                  </div>
                  {/* <div className="info-item">
                    <FaUserTie className="icon" />
                    <a
                      href="https://www.anuragkhandelwal.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Professor Anurag Khandelwal
                    </a>
                  </div> */}
                  <div className="info-item">
                    <FaBuilding className="icon" />
                    <a
                      href="https://matrix.to/#/@an.tony:matrix.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Element, Matrix
                    </a>
                  </div>
                  <div className="info-item">
                    <FaEnvelope className="icon" />
                    <a href="mailto:anton.melnychuk@yale.edu">Yale Email</a>
                  </div>
                  <div className="info-item">
                    <FaGithub className="icon" />
                    <a href="https://github.com/anton-mel" target="_blank"
                    rel="noopener noreferrer">GitHub</a>
                  </div>
                  <div className="info-item">
                    <FaLinkedin className="icon" />
                    <a href="https://www.linkedin.com/in/antonmelnychuk" target="_blank"
                    rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
            </aside>
            {/* Biography -------------------------------------------------- */}
            <section className="main-section" id="about">
              <h1 className="page-title">Biography</h1>
              <div className="biography-content">
              <p>
                I'm a rising senior at Yale University from Western Ukraine, studying Electrical Engineering & Computer Science. I conduct research in the <a href="https://www.yecl.org/" target="_blank" rel="noopener noreferrer">Efficient Computing Lab</a>. 
                My interests lies in high-performance systems with strong robustness guarantees. Currently, I'm working on FPGA system in collaboration with the <a href="https://quantuminstitute.yale.edu/Yale" target="_blank" rel="noopener noreferrer">Quantum Institute</a>.
              </p>
            </div>
            </section>
            {/* ───────── Publications / News ───────── */}
            <section className="main-section" id="publications">
              <h1 className="page-title">Publications & News</h1>

              {/* <div className="pub-year">[2025]</div>
              <ul className="pub-list">
                <li><a href="#">TODO</a> Later</li>
                <li><a href="#">TODO</a> Later</li>
              </ul> */}

              <div className="pub-year">[2024]</div>
              <ul className="pub-list">
                <li>TA'd and redesigned <a href="#projects">WeensyOS</a> in CPSC 3230.</li>
                <li> Joined <a href="https://www.yecl.org/" target="_blank" rel="noopener noreferrer">Efficient Computing Lab</a> as a summer Research Intern.</li>
                <li>
                  Joined <a href="https://vision.cs.yale.edu/team/" target="_blank" rel="noopener noreferrer">Vision Lab</a> as a Research Assistant.
                </li>
              </ul>

              <div className="pub-year">[2023]</div>
              <ul className="pub-list">
                {/* <li>
                  Assisted with occlusion-robust pedestrian prediction model and Omniverse synthetic data generation pipeline.
                  </li>
                  <li>
                  Co-led hyperspectral pill classification project with Swedish National Forensics Lab.
                  </li> */}
                <li>Intern at <a href="https://www.ironflight.ai/" target="_blank" rel="noopener noreferrer">IronFlight.AI</a>.</li>
                <li>Summer study abroad at <a href="https://www.ogu.ac.jp/english/" target="_blank" rel="noopener noreferrer">Osaka Gakuin University</a>.</li>
              </ul>


              <div className="pub-year">[2022]</div>
              <ul className="pub-list">
                <li>Selected at <a href="https://science.yalecollege.yale.edu/stem-fellowships/funding-stem-opportunities-yale/stars" target="_blank" rel="noopener noreferrer">STARS Program</a>.</li>
                <li>Started at Yale!</li>
              </ul>
            </section>
            {/* ───────── Projects ───────── */}
            <section className="main-section" id="projects">
              <h1 className="page-title">Selected Projects</h1>

              {/* Fast-Raft */}
              <article className="project">
                <h2 className="project-title">
                  <a href="https://github.com/anton-mel/FastRaft" target="_blank" rel="noopener noreferrer">
                    Fast-Raft Network Consensus
                  </a>
                </h2>
                <p className="project-meta">Nov 2024 – Dec 2024 &nbsp;|&nbsp; Yale University [Research Project]</p>
                <p>
                  Implemented the first <strong>gRPC-based Fast-Raft</strong> (hierarchical consensus) in Go,
                  doubling speed and boosting throughput 5× for globally distributed, mobile-style networks, 
                  compared to traditional implementation of Raft/Paxos strong fault tolerance algorithms.
                  Containerised both clusters and deployed on AWS EKS with Terraform across three US
                  regions; evaluated performance improvement and fault-tolerance at scale using Chaos Mesh. <br/>
                  <a href="/dist/FastRaftProtocol.pdf" target="_blank" rel="noopener noreferrer" style={{fontWeight: 'bold', marginTop: '5px', display: 'inline-block'}}>
                    This Paper
                  </a> discusses the implementation details and results. <br />
                  <a href="https://drive.google.com/file/d/1CAnlGilz4y45UXrxEveRO-Res6b4B9j5/view" target="_blank" rel="noopener noreferrer" style={{fontWeight: 'bold', marginTop: '5px', display: 'inline-block'}}>
                    The demonstration video
                  </a> can be found via Google Drive here.
                </p>
              </article>

              {/* Rust for Linux */}
              <article className="project">
                <h2 className="project-title">
                  <a href="https://github.com/anton-mel/linux" target="_blank" rel="noopener noreferrer">
                    Rust for Linux — Thread-Safe File Ops Module
                  </a>
                </h2>
                <p className="project-meta">
                  Sep 2024 – Oct 2024&nbsp;&nbsp;|&nbsp;&nbsp;
                  <a href="https://github.com/Rust-for-Linux/linux" target="_blank" rel="noopener noreferrer">
                    Rust for Linux Community
                  </a>
                </p>
                <p>
                  Contributed to the <em>Rust for Linux</em> initiative. Recompiled and set up a custom version 
                  of Linux to support Rust-based kernel modules, contributing to the integration of Rust into the Linux kernel, with plans for eventual submission 
                  to the Linux Kernel Mailing List (LKML). Allowed system developers to write custom Linux loadable kernel modules for thread-safe file operations, 
                  minimizing <code>unsafe</code> blocks while ensuring compatibility with cross-compilation. 
                </p>
              </article>

              {/* WeensyOS-Rust */}
              <article className="project">
                <h2 className="project-title">
                  <a href="https://github.com/anton-mel/WeensyOS" target="_blank" rel="noopener noreferrer">
                    WeensyOS in Rust
                  </a>
                </h2>
                <p className="project-meta">May 2024 – Aug 2024 &nbsp;|&nbsp; Academic curriculum</p>
                <p>
                  Reimagined core systems curriculum by re-engineering <em>WeensyOS</em>—a minimalist teaching kernel created by Prof. 
                  Eddie Kohler at Harvard and used across most Ivy League—from C to memory-safe Rust. Runs on 
                  bare-metal x86-64, showcasing physical and virtual memory layout with only minimal <code>unsafe</code> code.
                </p>
                <img src="public/weensyosdemo.gif" alt="WeensyOS demo" style={{ width: '100%', marginTop: '10px', marginBottom: '30px', borderRadius: '8px' }} />
              </article>


                  {/* <article className="project">
                    <h2 className="project-title">
                      <a href="https://github.com/anton-mel/linux-flock" target="_blank" rel="noopener noreferrer">
                        Linux Flock for mCertiKOS
                      </a>
                    </h2>
                    <p className="project-meta">Mar 2024 – Apr 2024 &nbsp;|&nbsp; Yale University</p>
                    <p>
                      Designed and implemented a custom minimalistic version of Linux's <code>flock()</code> advisory locking mechanism within <strong>mCertiKOS</strong> — a formal verified teaching operating system kernel. This was part of an advanced Operating 
                      Systems course focused on OS fundamentals, including bootloaders, privilege levels, memory management, file systems, core preemption, 
                      PCI device integration, and more.
                    </p>
                  </article>

                  <article className="project">
                    <h2 className="project-title">
                      <a href="https://github.com/anton-mel/cpsc420" target="_blank" rel="noopener noreferrer">
                        Out-of-Order PARCv2 Processor
                      </a>
                    </h2>
                    <p className="project-meta">Nov 2024 – Dec 2024 &nbsp;|&nbsp; Yale University</p>
                    <p>
                      Developed an out-of-order execution pipeline for the PARCv2 processor in a Computer Architecture lab, integrating a Reorder Buffer (ROB) and supporting speculative execution after branch instructions. The processor improves throughput for branch-heavy workloads. <br/>
                      <a href="public/akt33-am3785-Lab4-Report.pdf" target="_blank" rel="noopener noreferrer" style={{fontWeight: 'bold', marginTop: '5px', display: 'inline-block'}}>
                        The report with evaluations
                      </a> can be found here.
                    </p>
                    <img src="public/ooodemo.png" alt="WeensyOS demo" style={{ width: '100%', marginTop: '10px', borderRadius: '8px' }} />
                  </article> */}
 
{/* 
              <button 
                onClick={() => setShowMoreProjects(!showMoreProjects)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  cursor: 'pointer',
                  fontSize: '1em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'color 0.2s ease',
                  padding: 0,
                  outline: 'none',
                  marginTop: '10px',
                  marginBottom: '20px'
                }}
                onMouseOver={(e) => {
                  const button = e.currentTarget;
                  button.style.color = 'var(--link-hover)';
                }}
                onMouseOut={(e) => {
                  const button = e.currentTarget;
                  button.style.color = '#888';
                }}
              >
                {showMoreProjects ? 'Show Less' : 'Show More'}
              </button> */}
            </section>
            {/* NEW — Classes & Teaching ----------------------------------- */}
            <section className="main-section" id="courses">
              <h1 className="page-title">Classes & Teaching</h1>

              <h2>Courses I've TA'ed</h2>

              <p>
                <strong>CPSC 323 – Systems Programming and Computer Organization</strong><br/>
                <em>Instructors – Prof. Lin Zhong and Prof. Jay Lim</em><br/>
                Teaching assistant for Yale core cs course. Redesigned two assignments, including a complete Rust rewrite of the WeensyOS kernel used in Homework 5 and the final project. Graded exams and held regular office hours.
              </p>

              <h2>Coursework</h2>
              <ul>
                <li><strong>EENG 420</strong> – Computer Architecture</li>
                <li><strong>EENG 425</strong> – Introduction to VLSI System Design [Incoming]</li>
                <li><strong>EENG 203</strong> – Circuits and Systems Design</li>
                <li><strong>EENG 202</strong> – Introduction to Communications and Control [Incoming]</li>
                <li><strong>EENG 201</strong> – Introduction to Computer Engineering</li>
                <li><strong>CPSC 426</strong> – Building Distributed Systems</li>
                <li><strong>CPSC 526</strong> – [Grad] Building AI Infra Systems [Incoming]</li>
                <li><strong>CPSC 429</strong> – Principles of Computer System Design</li>
                <li><strong>CPSC 422</strong> – Design and Implementation of Operating Systems</li>
                <li><strong>CPSC 323</strong> – Systems Programming and Computer Organization</li>
                <li><strong>CPSC 223</strong> – Data Structures and Programming Techniques</li>
                <li><strong>CPSC 327</strong> – Object Oriented Programming</li>
                <li><strong>CPSC 365</strong> – Proof-Based Algorithms</li>
                <li><strong>CPSC 202</strong> – Discrete Mathematics</li>
                <li><strong>MATH 225</strong> – Linear Algebra</li>
                <li><strong>PHYS 295</strong> – Research Methods in Astrophysics</li>
                <li><strong>ASTR 330</strong> – Scientific Computing in Astrophysics</li>
                <li><strong>EAST 119</strong> – Asian Art and Culture</li>
                <li><strong>Japanese Language</strong> – Four-year certificate program</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="/">Sitemap</a>
            <div className="footer-follow">
              FOLLOW: 
              <a href="https://github.com/anton-mel" className="footer-icon-link">
                <FaGithub /> GITHUB
              </a>
            </div>
          </div>
          <div className="footer-copyright">
            © 2025 Anton Melnychuk. All rights reserved. <br/>
            Site last updated 2025-04-29.
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
