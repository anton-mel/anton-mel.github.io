import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function Blog() {
  const navigate = useNavigate();

  const handleBlogClick = (path) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank', 'noopener noreferrer');
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <div className="app">
        <header className="header">
          <div className="scroll-progress" style={{ width: '0%' }} />
        </header>
        <main className="main-content">
          <div className="content-wrapper">
            {/* Projects & Blog Section */}
            <h1 className="page-title">Projects & Blog</h1>
            <a href="/" className="blog-block-readmore">← Back to main page</a>
            <section className="main-section blog-page" style={{ marginLeft: '0' }}>

              {/* HeliosOS */}
              <div 
                className="blog-block" 
                onClick={() => handleBlogClick('/blog/helios')}
                style={{ cursor: 'pointer' }}
              >
                <img src="public/helios.png" alt="HeliosOS demo" style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                <div className="blog-block-content">
                  <div className="blog-block-title">
                    Multi-FPGA Management System: HeliosOS
                  </div>
                  <div className="blog-block-meta">Jan 2025 – Present &nbsp;|&nbsp; Multi-FPGA Systems, Quantum Error Correction, SoC Design</div>
                  <div>
                    <strong>First-of-its-kind multi-FPGA system</strong> for real-time quantum error correction. Helios-net overcomes resource constraints through a distributed architecture using five Xilinx VMK-180 FPGAs. It employs a hybrid tree-grid topology to minimize latency for lattice surgery operations and introduces fusion-Union-Find, a novel approach to decoding merged logical qubits that avoids redundant computations. The system can decode 100 logical qubits (d=5) faster than the measurement rate, making it practical for real-time quantum error correction.
                  </div>
                </div>
              </div>

              {/* Huawei Visa Blog Post */}
              <div 
                className="blog-block" 
                onClick={() => handleBlogClick('/blog/huawei-visa')}
                style={{ cursor: 'pointer' }}
              >
                <img src="public/huawei.png" alt="Huawei R&D" style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                <div className="blog-block-content">
                  <div className="blog-block-title">
                    Turning Point: Visa Hurdles Ended My Huawei Kernel R&D Internship Plans
                  </div>
                  <div className="blog-block-meta">Dec 2024 &nbsp;|&nbsp; Personal Experience, Career Development, International Work</div>
                  <div>
                    A personal reflection on how visa complications unexpectedly redirected my career path from a promising Huawei kernel R&D internship. This experience highlights the challenges international students face in pursuing global opportunities and how such setbacks can lead to unexpected growth and new directions in research and development.
                  </div>
                </div>
              </div>

              {/* Fast-Raft */}
              {/* <div className="blog-block">
                <div className="blog-block-content">
                  <div className="blog-block-title">
                    <a href="https://github.com/anton-mel/FastRaft" target="_blank" rel="noopener noreferrer">Fast-Raft Network Consensus</a>
                  </div>
                  <div className="blog-block-meta">Nov 2024 – Dec 2024 &nbsp;|&nbsp; Distributed Systems, Go, AWS, gRPC, Terraform, Chaos Mesh</div>
                  <div>
                    <strong>First open-source implementation of the gRPC-based Fast-Raft protocol</strong>, a hierarchical consensus algorithm optimized for globally distributed highly-dynamic systems like mobile networks. Achieved a 2× speedup and a 5× increase in throughput best-case compared to traditional Raft and Paxos algorithms. Containerized cluster nodes and deployed them on AWS EKS using Terraform across three US regions. Performance improvements and fault tolerance were rigorously evaluated at scale using Chaos Mesh for fault injection and resilience testing.
                  </div>
                </div>
              </div> */}

              {/* Rust for Linux */}
              {/* <div className="blog-block">
                <div className="blog-block-content">
                  <div className="blog-block-title">
                    <a href="https://github.com/anton-mel/linux" target="_blank" rel="noopener noreferrer">Rust for Linux — Adding Rust LKM Support</a>
                  </div>
                  <div className="blog-block-meta">Sep 2024 – Oct 2024&nbsp;|&nbsp; Writing Linux kernel, C-Rust Co-design, Device Drivers, FFI</div>
                  <div>
                    Contributed to the <em>Rust for Linux</em> initiative. Recompiled and set up a custom version of Linux to <strong>support Rust-based kernel drivers,</strong> contributing to the integration of Rust into the Linux kernel, with plans for eventual submission to the Linux Kernel Mailing List (LKML). Allowed system developers to write custom Linux loadable kernel modules for thread-safe file operations, minimizing <code>unsafe</code> blocks while ensuring compatibility with cross-compilation.
                  </div>
                </div>
              </div> */}

              {/* Out-of-Order PARCv2 Processor */}
              <div 
                className="blog-block" 
                onClick={() => handleBlogClick('https://github.com/anton-mel/cpsc420')}
                style={{ cursor: 'pointer' }}
              >
                <img src="public/parcv2.png" alt="PARCv2 Processor demo" style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                <div className="blog-block-content">
                  <div className="blog-block-title">
                    Out-of-Order PARCv2 Processor
                  </div>
                  <div className="blog-block-meta">Nov 2024 – Dec 2024 &nbsp;|&nbsp; Yale University, Computer Architecture</div>
                  <div>
                    Developed a comprehensive <strong>out-of-order PARCv2 processor</strong> with speculative execution through four progressive lab implementations. The final design features a Reorder Buffer (ROB) for in-order commit and speculative branch processing, achieving <strong>33.2% average speedup</strong> over baseline pipelined processors. Earlier stages included a two-wide superscalar implementation with dual instruction fetch and issue logic, delivering <strong>25% speedup</strong> on vector benchmarks like masked filter and vvadd. The complete pipeline supports bypassing logic, integrated multiplier/divider units, and sophisticated hazard management through scoreboarding. The processor demonstrates resilience to WAW hazards and handles high-latency operations efficiently.
                  </div>
                </div>
              </div>

              {/* WeensyOS-Rust */}
              <div 
                className="blog-block" 
                onClick={() => handleBlogClick('https://github.com/anton-mel/WeensyOS')}
                style={{ cursor: 'pointer' }}
              >
                <img src="public/weensyosdemo.gif" alt="WeensyOS demo" style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                <div className="blog-block-content">
                  <div className="blog-block-title">
                    WeensyOS in Rust
                  </div>
                  <div className="blog-block-meta">May 2024 – Aug 2024 &nbsp;|&nbsp; Operating Systems, Booloader, Rust, Teaching, x86-64</div>
                  <div>
                    <strong>Redesigned core systems curriculum</strong> by re-engineering <em>WeensyOS</em>—a minimalist teaching kernel created by Prof. Eddie Kohler at Harvard and used across 6 Ivy League to teach core OS concepts <strong>(adapted at Yale from Spring 2024).</strong> It runs on bare-metal x86-64 machines (QEMU emulated CPUs) with POSIX compatibility and newly added microkernel design. Rust-WeensyOS aims for a complete segfault-free experience, inspired by Rust OS pioneers like <a href="https://www.redox-os.org/" target="_blank" rel="noopener noreferrer">RedoxOS</a>, <a href="https://9p.io/plan9/" target="_blank" rel="noopener noreferrer">Plan 9</a>, <a href="https://www.minix3.org/" target="_blank" rel="noopener noreferrer">Minix</a>, <a href="https://sel4.systems/" target="_blank" rel="noopener noreferrer">seL4</a>, <a href="https://www.freebsd.org/" target="_blank" rel="noopener noreferrer">BSD</a>, and <a href="https://www.kernel.org/" target="_blank" rel="noopener noreferrer">Linux</a>. Its previous version <strong>presents the first known-to-me attempt</strong> to statically offload major core kernel management services via two foreign function interfaces (FFI), as a proof of concept for the feasibility of transitioning portions of the Linux kernel to Rust.
                  </div>
                </div>
              </div>

              {/* Linux Flock for mCertiKOS */}
              {/* <div className="blog-block">
                <div className="blog-block-content">
                  <div className="blog-block-title">
                    <a href="https://github.com/anton-mel/linux-flock" target="_blank" rel="noopener noreferrer">Linux Flock for mCertiKOS</a>
                  </div>
                  <div className="blog-block-meta">Mar 2024 – Apr 2024 &nbsp;|&nbsp; Yale University, Operating Systems</div>
                  <div>
                    Designed and implemented a custom minimalistic version of Linux's <code>flock()</code> advisory locking mechanism within <strong>mCertiKOS</strong> — a formal verified teaching operating system kernel. This was part of an advanced Operating Systems course focused on OS fundamentals, including bootloaders, privilege levels, memory management, file systems, core preemption, PCI device integration, and more.
                  </div>
                </div>
              </div> */}
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
