import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { FaMapMarkerAlt, FaUniversity, FaUserTie, FaBuilding, FaEnvelope, FaGithub, FaLinkedin, FaSun, FaMoon } from 'react-icons/fa'

function App() {
  const [isDarkMode, setIsDarkMode]   = useState(true);
  const [scrollProgress, setProgress] = useState(0);
  const [activeSection, setActive]    = useState('about');

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
                  <div className="info-item">
                    <FaUserTie className="icon" />
                    <a
                      href="https://www.anuragkhandelwal.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Professor Anurag Khandelwal
                    </a>
                  </div>
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
                <p>I'm a rising senior at <strong>Yale University</strong> majoring in Electrical Engineering & Computer Science and leaning hard toward low‑level systems research.</p>
                <p>Day‑to‑day, you’ll find me deep in <strong>operating‑system kernels, computer architecture, FPGA design, and hardware–software co‑design</strong>. Recent adventures range from rewriting <em>WeensyOS</em> in Rust and building a custom Unix‑like shell for an mCertiKOS variant, to prototyping a video‑streaming driver on a Xilinx ZCU106 and tweaking Fast Raft for a Spanner‑style distributed store. I’m happiest when a scope probe or <code>gdb</code> prompt is open—and even happier when the two talk to each other.</p>
                <p>This summer I’m staying in Yale’s <strong>Efficient Computing Lab</strong> (after a tough call between that and a research stint in Germany) to push kernel isolation and AI‑centric accelerators forward; next year I’ll polish the work into a senior thesis and Ph.D. applications focused on systems‑level innovation.</p>
                <p>Beyond the lab, I keep my mind and hands busy: baking Ukrainian <em>paska</em> bread, crafting beaded jewelry, translating Japanese kobanashi skits, or logging miles on New England’s trails. I’m also a professional historian of Japan’s Pacific‑War identity—a lens that keeps my technical work grounded in human context.</p>
                <p>🇺🇦  <strong>Born in a small village in Western Ukraine</strong>, I carry those roots into everything I build: pragmatic, resource‑conscious, and always aiming for impact.</p>
              </div>
            </section>
            {/* ───────── Publications / News ───────── */}
            <section className="main-section" id="publications">
              <h1 className="page-title">Publications & News</h1>

              <div className="pub-year">[2025]</div>
              <ul className="pub-list">
                <li><a href="#">Weave</a> accepted to OSDI’25!</li>
                <li><a href="#">In-network ordering of coherence messages for release consistency</a> accepted to ISCA’25!</li>
                <li><a href="#">PULSE</a> accepted to ASPLOS’25!</li>
              </ul>

              <div className="pub-year">[2024]</div>
              <ul className="pub-list">
                <li><a href="#">NetApp Faculty Fellowship</a> — thanks NetApp!</li>
                <li><a href="#">Yupeng</a> has successfully defended his thesis! Congrats Dr. Tang!</li>
                <li><a href="#">Length leakage in oblivious storage</a> accepted to USENIX Security’24!</li>
                <li><a href="#">Trinity</a> accepted to EuroSys’24, wins <strong>Best Student Paper Award!</strong> Congratulations Ziming Mao!</li>
                <li><a href="#">PromptCache</a> accepted to MLSys’24!</li>
                <li><a href="#">SCALO</a> selected for inclusion in IEEE Micro’s Top Picks in Computer Architecture 2024!</li>
              </ul>

              <div className="pub-year">[2023]</div>
              <ul className="pub-list">
                <li><a href="#">SCALO</a> accepted to ISCA’23, wins <strong>Best Paper Award!</strong></li>
                <li>Work on using <a href="#">Complementary Learning Systems for prefetching in disaggregated memory</a> accepted to HotOS’23!</li>
                <li><a href="#">Karma</a> accepted to OSDI’23!</li>
                <li>Received <a href="#">Roberts Innovation Fund Award</a> for work on resource disaggregation!</li>
              </ul>

              <div className="pub-year">[2022]</div>
              <ul className="pub-list">
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
                <p className="project-meta">Nov 2024 – Dec 2024 &nbsp;|&nbsp; Yale University</p>
                <p>
                  Implemented the first <strong>gRPC-based Fast-Raft</strong> (hierarchical consensus) in Go,
                  doubling speed and boosting throughput 5× for globally distributed, mobile-style networks.
                  Containerised Raft / Fast-Raft clusters and deployed on AWS EKS with Terraform across three US
                  regions; evaluated performance and fault-tolerance at scale using Chaos Mesh.
                </p>
              </article>

              {/* Rust for Linux */}
              <article className="project">
                <h2 className="project-title">
                  <a href="https://github.com/anton-mel/linux" target="_blank" rel="noopener noreferrer">
                    Rust for Linux — Thread-Safe File Ops Module
                  </a>
                </h2>
                <p className="project-meta">Sep 2024 – Oct 2024 &nbsp;|&nbsp; Yale School of Engineering &amp; Applied Science</p>
                <p>
                  Contributed to the <em>Rust for Linux</em> initiative, writing custom loadable kernel modules
                  for thread-safe file operations that minimise <code>unsafe</code> blocks and work seamlessly with
                  cross-compilation.
                </p>
              </article>

              {/* WeensyOS-Rust */}
              <article className="project">
                <h2 className="project-title">
                  <a href="https://github.com/anton-mel/WeensyOS" target="_blank" rel="noopener noreferrer">
                    WeensyOS in Rust
                  </a>
                </h2>
                <p className="project-meta">May 2024 – Aug 2024 &nbsp;|&nbsp; Yale School of Engineering &amp; Applied Science</p>
                <p>
                  Re-engineered the classic teaching kernel <strong>WeensyOS</strong> from C to memory-safe Rust.
                  Runs on bare-metal x86-64/QEMU, showcases physical + virtual memory layout with only minimal
                  <code>unsafe</code>. Now used in multiple US system-programming courses.
                </p>
              </article>
            </section>
            {/* NEW — Classes & Teaching ----------------------------------- */}
            <section className="main-section" id="courses">
              <h1 className="page-title">Classes & Teaching</h1>

              <h2>Courses I’ve TA’ed</h2>
              <p>
                <strong>Independent Work Seminar 11: “Wrestling with Distributed Systems”</strong><br/>
                <em>Instructor – Prof. Mae Milano</em><br/>
                Teaching assistant as a sophomore for a junior-level seminar. I guided students in systems-architecture design and debugged projects ranging from local-first Android apps to Raspberry Pi + Azure deployments.
              </p>

              <h2>Coursework</h2>
              <ul>
                <li><strong>COS 597E</strong> (grad, taken junior year) – Advanced Topics in CS: Programming Languages (for Distributed Systems) w/ Mae Milano</li>
                <li><strong>ECE 584</strong> (grad, taken junior year) – Advanced Wireless Systems w/ Yasaman Ghasempour</li>
                <li><strong>COS 418</strong> – Distributed Systems w/ Michael Freedman &amp; Wyatt Lloyd</li>
                <li><strong>COS 417</strong> – Operating Systems w/ Mae Milano &amp; Amit Levy</li>
                <li><strong>COS 324</strong> – Introduction to Machine Learning w/ Ruth C. Fong &amp; Lydia T. Liu</li>
                <li><strong>ECE 470 / COS 470</strong> – Principles of Blockchains w/ Pramod Viswanath</li>
                <li><strong>ECE 458</strong> – Photonics &amp; Light-Wave Communications w/ Paul Prucnal</li>
                <li><strong>ECE 445</strong> – Solid-State Electronic Devices w/ Saien Xie</li>
                <li><strong>ECE 302</strong> – Robotic &amp; Autonomous Systems Lab</li>
                <li><strong>ECE 201</strong> – Information Signals w/ Sanjeev Kulkarni</li>
                <li><strong>ECE 203</strong> – Electric Circuits w/ Hossein Valavi</li>
                <li><strong>ECE 206 / COS 306</strong> – Contemporary Logic Design w/ Sharad Malik</li>
                <li><strong>COS 217</strong> – Introduction to Programming Systems w/ Szymon Rusinkiewicz</li>
                <li><strong>COS 226</strong> – Algorithms &amp; Data Structures w/ Kevin Wayne</li>
                <li><strong>Chinese Language</strong> – six-course sequence, completed the minor</li>
              </ul>

              <h2>Upcoming</h2>
              <ul>
                <li><strong>COS 461 / ECE 471</strong> – Computer Networks w/ Maria Apostolaki</li>
                <li><strong>COS 375 / ECE 375</strong> – Computer Architecture &amp; Organization w/ David August &amp; Margaret Martonosi</li>
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
            © 2025 Anton Melnychuk, Powered by Jekyll & AcademicPages, a fork of Minimal Mistakes. <br/>
            Site last updated 2025-04-29
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
