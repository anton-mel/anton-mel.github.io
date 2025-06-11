import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { FaMapMarkerAlt, FaUniversity, FaUserTie, FaBuilding, FaEnvelope, FaGithub, FaLinkedin, FaSun, FaMoon } from 'react-icons/fa'

function App() {
  const [scrollProgress, setProgress] = useState(0);
  const [activeSection, setActive] = useState('about');
  const [showMoreProjects, setShowMoreProjects] = useState(false);

  /* ------------- scroll handler (progress bar + active tab) ------------- */
  const handleScroll = useCallback(() => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const current = window.scrollY;
    setProgress((current / total) * 100);

    /* figure out which .main-section is currently near the top */
    const sections = document.querySelectorAll('.main-section');
    const headerH = 90;                       // header + margin safety
    let currentId = activeSection;

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
  const navClick = id => e => {
    e.preventDefault();                       // stop default anchor jump
    setActive(id);                            // mark link active now

    const el = document.getElementById(id);
    if (!el) return;

    const offset = 80;                      // ↓ your desired clearance
    const yPos = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: yPos, behavior: 'smooth' });

    // keep hash in the address bar so the page can be shared / refreshed
    history.replaceState(null, '', `#${id}`);
  };

  const copyPGP = () => {
    navigator.clipboard.writeText('4761ECDDC5CCC90BD358773C168630462D227233');
  };

  return (
    <>
      <div className="app">
        {/* <header className="header">
          <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
          <div className="header-content">
            <a href="/" className="name">Academic Profile</a>
            <nav className="navigation">
              <a href="#about"        onClick={navClick('about')}        className={activeSection==='about'        ? 'active' : ''}>about</a>
              <a href="#publications" onClick={navClick('publications')} className={activeSection==='publications' ? 'active' : ''}>publications</a>
              <a href="#projects"     onClick={navClick('projects')}     className={activeSection==='projects'     ? 'active' : ''}>projects</a>
              <a href="#courses"      onClick={navClick('courses')}      className={activeSection==='courses'      ? 'active' : ''}>courses</a>

            </nav>
          </div>
        </header> */}
        <main className="main-content">
          <div className="content-wrapper">
            <aside className="side-panel">
              <div className="avatar-container">
                <img src="public/profile.jpg" alt="Anton Melnychuk" className="avatar" />
              </div>
              <div className="personal-info">
                <h1>Anton Melnychuk</h1>
                <ul className="description">
                  <li>51 Prospect St, New Haven, CT</li>
                  <li>Contact: <a>anton.melnychuk [at] yale.edu</a></li>
                  <li>Matrix: @an.tony:matrix.org</li>
                  <li>GitHub: <a href='https://github.com/anton-mel'>anton-mel</a></li>
                </ul>
                <div className='sel-btn-box'>
                  <button className="sel-btn" href="/cv.pdf" target="_blank" rel="noopener noreferrer">CV</button>
                  <button className="sel-btn" onClick={copyPGP}>Copy PGP</button>
                </div>
              </div>
            </aside>
            {/* Biography -------------------------------------------------- */}
            <section className="main-section" id="about">
              <h1 className="page-title">Biography</h1>
              <div className="biography-content">
                <p>
                  I'm a rising senior at Yale from Ukraine, studying Electrical Engineering & Computer Science with a Japanese
                  Language Certificate (prev. Osaka Gakuin University, Japan). I’m fortunate to be involved in research at
                  the <a href="https://www.yecl.org/" target="_blank" rel="noopener noreferrer">Efficient Computing Lab</a>,
                  where I work under the guidance of <a href="https://www.linzhong.org/" target="_blank" rel="noopener noreferrer">Prof. Lin Zhong</a>.
                  My interest lie in high-performance systems with strong robustness guarantees:
                </p>
                <ul>
                  <li>Can we build OS that is so robust it never hits the Blue Screen of Death?</li>
                  <li>Enable drones to keep flying even when memory is completely exhausted?</li>
                  <li>Power high-frequency trading platforms where every nanosecond counts?</li>
                </ul>
                <p>
                  Currently I'm working on a multi-FPGA System-on-Chip (SoC) project in collaboration with the Yale Quantum Institute; meanwhile hobby-exploring high-frequency trading (HFT) with FPGA acceleration. Previously, I have built a custom Rust OS (see WeensyOS) used for teaching purposes at Yale adapted by 3+ Ivy Universities, contributed to reintroducing <a href='https://rust-for-linux.com/' target="_blank">Rust LKM support</a> in the Linux 22.02 release, and worked on lightweight OS verification techniques through stricter <a href='https://crates.io/crates/proc_assertions' target='_blank'>Rust compiler</a> (proc-macros crate, 2,000+ installs).
                  In my free time, I assemble and experiment with drones in support of Ukraine's humanitarian drone R&D (prev. Iron Flight).
                </p>
                <p>
                  I care deeply about building systems as a way to drive social impact by bridging research hypotheses with real-world engineering challenges (R&D).
                </p>
              </div>
            </section>
            {/* ───────── Publications / News ───────── */}
            <section className="main-section" id="publications">
              <h1 className="page-title">Publications & News</h1>

              <div className="pub-year">[2025]</div>
              <ul className="pub-list">
                <li><a href="#">[Blog] Multi-FPGA</a> SoC Management Research (Ongoing).</li>
                <li><a href="#">[Blog]</a> Building custom PARCv2 CPU with OoO execution.</li>
                <li>Visited QEC'25 Quantum Error Correction Symposium.</li>
                <li>Visited OSDI’25 USENIX Symposium on Operating Systems.</li>
                <li><a href="https://drive.google.com/file/d/1BWq0mF_oKC9xViJjrsqc4QLI0Ru1-Xs-/view">[Archive] Fast Raft</a> (vs Raft) hierarchical consensus algorithm.</li>

              </ul>

              <div className="pub-year">[2024]</div>
              <ul className="pub-list">
                <li>Introducing Rust <a href="#projects">WeensyOS</a> (5,000+ LOC) @ Systems Programming course!</li>
                <li>Joined <a href="https://www.yecl.org/" target="_blank" rel="noopener noreferrer">Efficient Computing Lab</a> as a summer Research Intern.</li>
                <li>Joined Ukraine Drone R&D @ <a href="https://www.ironflight.ai/" target="_blank" rel="noopener noreferrer">IronFlight.AI</a>.</li>
                <li>Joined <a href="https://vision.cs.yale.edu/team/" target="_blank" rel="noopener noreferrer">Vision Lab</a> as a Research Assistant.</li>
              </ul>

              {/* <div className="pub-year">[2023]</div> */}
              {/* <ul className="pub-list">
                <li>
                  Assisted with occlusion-robust pedestrian prediction model and Omniverse synthetic data generation pipeline.
                  </li>
                  <li>
                  Co-led hyperspectral pill classification project with Swedish National Forensics Lab.
                  </li>
                <li>Intern at <a href="https://www.ironflight.ai/" target="_blank" rel="noopener noreferrer">IronFlight.AI</a> as a Drone Embedded Developer.</li>
                <li>Summer study abroad at <a href="https://www.ogu.ac.jp/english/" target="_blank" rel="noopener noreferrer">Osaka Gakuin University</a>.</li>
              </ul>*/}

              {/* <div className="pub-year">[2022]</div>
              <ul className="pub-list">
                <li>Selected at <a href="https://science.yalecollege.yale.edu/stem-fellowships/funding-stem-opportunities-yale/stars" target="_blank" rel="noopener noreferrer">STARS Program</a>.</li>
                <li>Started at Yale!</li>
              </ul> */}
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
                <p className="project-meta">Nov 2024 – Dec 2024 &nbsp;|&nbsp; Yale University</p>
                <p>
                  <strong>First open-source implementation of the gRPC-based Fast-Raft protocol</strong>, a hierarchical consensus algorithm optimized for globally distributed highly-dynamic systems like mobile networks. Achieved a 2× speedup and a 5× increase in throughput best-case compared to traditional Raft and Paxos algorithms. Containerized cluster nodes and deployed them on AWS EKS using Terraform across three US regions. Performance improvements and fault tolerance were rigorously evaluated at scale using Chaos Mesh for fault injection and resilience testing. <br />

                  {/* <a href="/dist/FastRaftProtocol.pdf" target="_blank" rel="noopener noreferrer" style={{fontWeight: 'bold', marginTop: '5px', display: 'inline-block'}}>
                    This Paper
                  </a> discusses the implementation details and results. <br />
                  <a href="https://drive.google.com/file/d/1CAnlGilz4y45UXrxEveRO-Res6b4B9j5/view" target="_blank" rel="noopener noreferrer" style={{fontWeight: 'bold', marginTop: '5px', display: 'inline-block'}}>
                    The demonstration video
                  </a> can be found via Google Drive here. */}
                </p>
              </article>

              {/* Rust for Linux */}
              <article className="project">
                <h2 className="project-title">
                  <a href="https://github.com/anton-mel/linux" target="_blank" rel="noopener noreferrer">
                    Rust for Linux — Adding Rust LKM Support
                  </a>
                </h2>
                <p className="project-meta">
                  Sep 2024 – Oct 2024&nbsp;&nbsp;|&nbsp;&nbsp;
                  <a href="https://github.com/Rust-for-Linux/linux" target="_blank" rel="noopener noreferrer">
                    Rust for Linux
                  </a>
                </p>
                <p>
                  Contributed to the <em>Rust for Linux</em> initiative. Recompiled and set up a custom version
                  of Linux to <strong>support Rust-based kernel drivers,</strong> contributing to the integration of Rust into the Linux kernel, with plans for eventual submission
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
                  Eddie Kohler at Harvard and used across 6 Ivy League to teach core OS concepts. It runs on bare-metal x86-64 machines (QEMU emulated CPUs) with POSIX compatibility and newly added microkernel design.
                  Rust-WeensyOS aims for a complete segfault-free experience, inspired by Rust OS pioneers like <a href="https://www.redox-os.org/" target="_blank" rel="noopener noreferrer">RedoxOS</a>. Its previous version <strong>presents the first known-to-me attempt</strong> to statically offload major core kernel management services via two foreign function interfaces (FFI), as a proof of concept for the feasibility of transitioning portions of the Linux kernel to Rust.
                </p>
                {/* <img src="public/weensyosdemo.gif" alt="WeensyOS demo" style={{ width: '100%', marginTop: '10px', marginBottom: '30px', borderRadius: '8px' }} /> */}
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
              <h1 className="page-title">Courses & Teaching</h1>

              <h2 className='ta-title'>Courses I've TA'ed</h2>

              <p className='ta-description'>
                <strong>CPSC 323 – Systems Programming and Computer Organization</strong><br />
                <em>Instructors – Prof. Lin Zhong and Prof. Jay Lim</em><br />
                Teaching assistant for Yale core systems course with 400+ students. Redesigned two assignments, including a complete Rust rewrite of the WeensyOS kernel used in Homework 5 and the final project. Graded exams and held weekly office hours (7.5 hours).
              </p>

              <h2 className='ta-title'>Relevant Coursework</h2>
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
                {/* <li><strong>PHYS 295</strong> – Research Methods in Astrophysics</li> */}
                {/* <li><strong>ASTR 330</strong> – Scientific Computing in Astrophysics</li> */}
                {/* <li><strong>EAST 119</strong> – Asian Art and Culture</li> */}
                {/* <li><strong>Japanese Language</strong> – Four-year certificate program</li> */}
              </ul>
            </section>

            <section className="main-section" id="volunteering">
              <h1 className="page-title">Volunteering</h1>

              {/* Iron Flight AI */}
              <article className="project">
                <h2 className="project-title">
                  <a href="https://www.ironflight.ai/" target="_blank" rel="noopener noreferrer">
                    IronFlight.AI
                  </a>
                </h2>
                <p className="project-meta">Nov 2024 – Dec 2024 &nbsp;|&nbsp; Drone Embedded Developer</p>
                <p>
                  Volunteered to support drone-based humanitarian R&D technology in Ukraine.
                  Proposed and developed an edge-computing object-tracking mechanism by partitioning
                  reliable NNs across a drone-server interface using a custom protocol,
                  reducing onboard workload, hardware requirements, and overall system cost. Deployed
                  lightweight on-chip object tracking models and benchmarked trade-offs against the
                  offloaded pipeline. Identified bottlenecks in the OpenCV library and reduced
                  end-to-end latency by over 40% by eliminating redundant user–kernel frame
                  transitions and rearchitecting critical data paths using in-kernel, zero-copy
                  NET and V4L2 LKMs.
                </p>
              </article>

              {/* Ukraine Global Scholars */}
              <article className="project">
                <h2 className="project-title">
                  <a href="https://www.ugs.foundation/" target="_blank" rel="noopener noreferrer">
                    Ukraine Global Scholars
                  </a>
                </h2>
                <p className="project-meta">June 2021 – Present &nbsp;|&nbsp; Alumni</p>
                <p>
                  Ukraine Global Scholars (UGS) is a non-profit organization that has helped 300+ Ukrainian high school students from modest backgrounds receive $78+ million in scholarships to top global boarding schools and colleges.
                </p>
              </article>
            </section>
          </div>
        </main>
      </div>
      {/* <footer className="footer">
        <div className="footer-content">
          <div className="footer-copyright">
            © 2025 Anton Melnychuk. All rights reserved. <br/>
            Site last updated 2025-04-29.
          </div>
        </div>
      </footer> */}
    </>
  )
}

export default App
