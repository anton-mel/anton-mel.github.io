import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { FaArrowUp } from 'react-icons/fa'
import SidePanel from './components/SidePanel'
import Footer from './components/Footer'
import Projects from './components/Projects'

function App() {
  const [scrollProgress, setProgress] = useState(0);
  const [activeSection, setActive] = useState('about');
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);


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

  // Show scroll-to-top button if scrolled more than 0px
  useEffect(() => {
    const handleScrollBtn = () => {
      setShowScrollTop(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScrollBtn, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollBtn);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  return (
    <>
      <div className="app">
        <header className="header">
          <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
        </header>
        <main className="main-content">
          <div className="content-wrapper">
            <SidePanel />
            {/* Biography -------------------------------------------------- */}
            <section className="main-section" id="about">
              <div className="biography-content">

                {/* Image Carousel */}
                {/* <div className="carousel-container" style={{marginTop: '1rem'}}>
                  <div className="carousel-wrapper">
                    {carouselImages.map((image, index) => (
                      <div key={index} className="carousel-slide">
                        <img 
                          src={image} 
                          alt={`Carousel image ${index + 1}`}
                          className="carousel-image"
                        />
                      </div>
                    ))}
                  </div>
                </div> */}

                <p>
                  I'm a rising senior at <a href="https://www.yale.edu/" target="_blank" rel="noopener noreferrer">Yale University</a>, majoring in Electrical and Computer Engineering.
                  <span style={{ display: "block", height: "1rem" }}></span>
                  I'm enthusiastic about <strong>hardware-software co-design</strong> and top-down R&D for <strong>high-performance</strong> systems with strong <strong>robustness</strong> guarantees. 
                  My previous undergraduate work-experience spans hypothesis-driven research, with valuable opportunity to collaborate with industries such as Huawei and AMD, from high-level systems such as custom consensus
                  algorithms or linearizability proofs, to low-level engineering problems in quantum, brain-computer interfaces, or operating systems.
                  In the future, I aspire to contribute to <strong>large-scale</strong> infrastructure that serves millions.
                </p>

                <div className="hashtag-container">
                  <span className="hashtag">#chip-design</span>
                  <span className="hashtag">#fpgas</span>
                  <span className="hashtag">#soc-design</span>
                  <span className="hashtag">#xilinx</span>
                  <span className="hashtag">#computer-architecture</span>
                  <span className="hashtag">#hardware-acceleration</span>
                  <span className="hashtag">#operating-systems</span>
                  <span className="hashtag">#rust</span>
                  <span className="hashtag">#go</span>
                  <span className="hashtag">#distributed-computing</span>
                  <span className="hashtag">#networks</span>
                  <span className="hashtag">#ai-infrastructure</span>
                </div>
              </div>
            </section>
            {/* ───────── Publications / News ───────── */}
            <section className="main-section" id="publications">
              <h1 className="page-title">Recent News</h1>

              <div className="pub-year">[2025]</div>
              <ul className="pub-list">
                <li>
                  <div className="pub-btn-col"><a href="#" className="a-btn">PDF</a></div>
                  <div className="pub-text-col">Starting my Thesis Research in Brain-Computer Interfaces w\ <a href="https://www.cs.yale.edu/homes/abhishek/" target="_blank" rel="noopener noreferrer">Prof. Bhattacharjee</a>.</div>
                </li>
                <li>
                  <div className="pub-btn-col"><a href="#" className="a-btn">PDF</a></div>
                  <div className="pub-text-col">Introducing SPF+ distributed version of FPGA-based MicroBlossom QEC system.</div>
                </li>
                <li>
                  <div className="pub-btn-col"><a href="#" className="a-btn">PDF</a></div>
                  <div className="pub-text-col">ReconfigR: Remote & Runtime Multi-FPGA SoC Management (Ongoing).</div>
                </li>
                {/* <li>
                  <div className="pub-btn-col"><a target="_blank" href="https://qec25.yalepages.org/" className="a-btn">Link</a></div>
                  <div className="pub-text-col">Visisted QEC'25 Quantum Error Correction Symposium.</div>
                </li> */}
                <li>
                  <div className="pub-btn-col"><a target="_blank" href="https://www.usenix.org/conference/osdi25" className="a-btn">Link</a></div>
                  <div className="pub-text-col">Participated in <a href="https://www.usenix.org/conference/osdi25" target="_blank" rel="noopener noreferrer">ATC/OSDI '25</a> (USENIX Symposium on Operating Systems) and <a href="https://qec25.yalepages.org/" target="_blank" rel="noopener noreferrer">QEC '25</a> (Quantum Error Correction) research conferences.</div>
                </li>
                {/* <li>
                  <div className="pub-btn-col"><a href="#" className="a-btn recommended">Blog</a></div>
                  <div className="pub-text-col">Turning Point: Visa Hurdles & Update on <a href="https://career.huawei.com/reccampportal/portal5/index.html" target="_blank" rel="noopener noreferrer">Huawei Kernel R&D Internship</a> Plans.</div>
                </li> */}
                <li>
                  <div className="pub-btn-col"><a href="#" className="a-btn recommended">Blog</a></div>
                  <div className="pub-text-col">From In-Order to Out-of-Order: Speculative Execution in a Custom PARCv2 CPU.</div>
                </li>
              </ul>

              <div className="pub-year">[2024]</div>
              <ul className="pub-list">
                <li>
                  <div className="pub-btn-col"><a href="https://drive.google.com/file/d/1BWq0mF_oKC9xViJjrsqc4QLI0Ru1-Xs-/view" className="a-btn recommended">Read</a></div>
                  <div className="pub-text-col">Fast Raft (vs Raft) <a href="https://drive.google.com/file/d/1BWq0mF_oKC9xViJjrsqc4QLI0Ru1-Xs-/view">faster hierarchical consensus</a> algorithm for datacenters.</div>
                </li>
                <li>
                  <div className="pub-btn-col"><a href="#projects" className="a-btn recommended">Blog</a></div>
                  <div className="pub-text-col">Introducing <a href="#projects">Rust WeensyOS</a> (10,000+ LOC) @ Systems Programming course!</div>
                </li>
                {/* <li>
                  <div className="pub-btn-col"><a href="#" className="a-btn">Link</a></div>
                  <div className="pub-text-col">Joined <a href="https://www.yecl.org/" target="_blank" rel="noopener noreferrer">Efficient Computing Lab</a> as a summer Research Intern.</div>
                </li> */}
                <li>
                  <div className="pub-btn-col"><a target="_blank" href="https://www.ironflight.ai/" className="a-btn">Link</a></div>
                  <div className="pub-text-col">Joined Ukraine Drone R&D @ IronFlight.AI.</div>
                </li>
                {/* <li>
                  <div className="pub-btn-col"><a href="#" className="a-btn">Link</a></div>
                  <div className="pub-text-col">Joined <a href="https://vision.cs.yale.edu/team/" target="_blank" rel="noopener noreferrer">Vision Lab</a> as a Research Assistant.</div>
                </li> */}
              </ul>
            </section>

            {/* ───────── Projects ───────── */}
            <section className="main-section" id="projects">
              <h1 className="page-title" style={{marginBottom: '1rem'}}>Selected Projects & Blog</h1>
              
              <Projects showFullDescriptions={false} />

              <a href="/blog" className="blog-block-readmore">More Projects <span style={{fontSize: '1.1em', marginLeft: '2px'}}>→</span></a>

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
                <strong>CPSC 3230 – Systems Programming and Computer Organization</strong><br />
                <em>Instructors – Prof. Lin Zhong and Prof. Jay Lim</em>
              </p>

              <h2 className='ta-title'>Relevant Coursework</h2>
              <ul>
                <li><strong>EENG 420</strong> – Computer Architecture</li>
                <li><strong>EENG 425</strong> – Introduction to VLSI System Design [Incoming]</li>
                <li><strong>EENG 203</strong> – Circuits and Systems Design</li>
                <li><strong>EENG 202</strong> – Introduction to Communications and Control [Incoming]</li>
                <li><strong>EENG 201</strong> – Introduction to Computer Engineering</li>
                <li><strong>CPSC 433</strong> – Computer Networks</li>
                <li><strong>CPSC 426</strong> – Building Distributed Systems</li>
                <li><strong>CPSC 526</strong> – [Grad] Building AI Infra Systems [Incoming]</li>
                <li><strong>CPSC 429</strong> – Principles of Computer System Design</li>
                <li><strong>CPSC 422</strong> – Design and Implementation of Operating Systems</li>
                <li><strong>CPSC 323</strong> – Systems Programming and Computer Organization</li>
                <li><strong>CPSC 223</strong> – Data Structures and Programming Techniques</li>
                <li><strong>CPSC 327</strong> – Object Oriented Programming</li>
                <li><strong>CPSC 365</strong> – Proof-Based Algorithms</li>
                {/* <li><strong>CPSC 202</strong> – Discrete Mathematics</li> */}
                {/* <li><strong>MATH 225</strong> – Linear Algebra</li> */}
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
                <p className="project-meta">Nov 2024 – Dec 2024 &nbsp;|&nbsp; Embedded Developer</p>
                <p>
                  <strong>Volunteered to support drone-based humanitarian R&D technology in Ukraine. </strong> 
                   Partitioned drone DNN workloads from STM32 MCU to a remote host with onboard FPV goggles.
                </p>
              </article>
 
              <Footer />

              {/* Ukraine Global Scholars
              <article className="project">
                <h2 className="project-title">
                  <a href="https://www.ugs.foundation/" target="_blank" rel="noopener noreferrer">
                    Ukraine Global Scholars
                  </a>
                </h2>
                <p className="project-meta">June 2021 – Present &nbsp;|&nbsp; Alumni</p>
                <p>
                  Ukraine Global Scholars (UGS) is a non-profit organization that has helped 300+ Ukrainian high school students from modest backgrounds receive $78+ million in scholarships to top colleges.
                </p>
              </article> */}
            </section>
          </div>
        </main>
      </div>
      {showScrollTop && (
        <button className="scroll-to-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
          <FaArrowUp />
        </button>
      )}
    </>
  )
}

export default App
