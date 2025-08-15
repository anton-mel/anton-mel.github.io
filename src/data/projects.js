export const projects = [
  {
    id: 'perceptron-branch',
    title: 'Perceptron Branch Prediction (Paper Review)',
    githubUrl: '',
    period: 'Mar 2025',
    technologies: 'Branch Prediction, Microarchitecture, Machine Learning',
    shortDescription: 'Summary of Jimenez & Lin\'s “Dynamic Branch Prediction with Perceptrons”: linear-scaling O(h) predictor that learns long-range correlations; hybrid designs improve ILP with IPC latency.',
    fullDescription: `Modern CPUs speculate aggressively; classic counter-based predictors (gshare/bi-mode) suffer from exponential scaling with history and aliasing. Jimenez & Lin introduce perceptrons to learn weighted correlations over global history with linear hardware growth, enabling longer effective histories and fewer mispredictions. Includes notes on strengths/weaknesses and hybrid designs.`,
    hasBlogPost: true,
    blogSlug: 'perceptron-branch-prediction',
    publishedAt: '2025-03-17'
  },
  {
    id: 'ooo-parcv2',
    title: 'Out-of-Order PARCv2 CPU with Speculation',
    githubUrl: 'https://github.com/anton-mel/OoO-PARCv2',
    period: 'Dec 2024 – Jan 2025',
    technologies: 'Computer Architecture, Verilog, ROB, Scoreboarding, Speculation',
    shortDescription: 'Custom PARCv2 CPU with ROB-based in-order commit, scoreboarding, and safe branch speculation; averaged 33.2% speedup (+5.5% speedup for speculation best-case).',
    fullDescription: `This project is part of the Computer Architecture course at Yale. Over the semester, we implemented the PARCv2 ISA and built the pipeline bottom‑up—bypassing, superscalar issue, and finally out‑of‑order execution with speculation and precise exceptions. Along the way, we studied how industry designs high‑performance, energy‑efficient CPUs and accelerators (e.g., GPUs), weaving in core topics like memory hierarchies, virtual memory/translation, on‑chip networks, and coherence, with a forward look at ML‑guided resource management and emerging paradigms like neuromorphic computing for brain computer interfaces.`,
    hasBlogPost: true,
    blogSlug: 'ooo-parcv2',
    publishedAt: '2025-01-01'
  },
  {
    id: 'fast-raft',
    title: 'Faster Reliable Network Consensus for Large & Dynamic Datacenters',
    githubUrl: 'https://github.com/anton-mel/FastRaft',
    period: 'Nov 2024 – Dec 2024',
    technologies: 'Distributed Systems, K8s, Go, AWS, gRPC, Terraform, Chaos Mesh',
    shortDescription: 'First open-source implementation of the gRPC-based Fast-Raft protocol, a hierarchical consensus algorithm optimized for globally distributed highly-dynamic systems.',
    fullDescription: `First open-source implementation of the gRPC-based Fast-Raft protocol, a hierarchical consensus algorithm optimized for globally distributed highly-dynamic systems like mobile networks. Achieved a 2× speedup and a 5× increase in throughput best-case compared to traditional Raft and Paxos algorithms. Containerized cluster nodes and deployed them on AWS EKS using Terraform across three US regions. Performance improvements and fault tolerance were rigorously evaluated at scale using Chaos Mesh for fault injection and resilience testing.`,
    hasBlogPost: false
  },
  {
    id: 'rust-linux',
    title: 'Rust for Linux — Adding Rust Support to Linux',
    githubUrl: 'https://github.com/anton-mel/linux',
    period: 'Sep 2024 – Oct 2024',
    technologies: 'Writing Linux kernel, C-Rust Co-design, Device Drivers, FFI',
    shortDescription: 'Contributed to the Rust for Linux initiative, recompiling and setting up a custom version of Linux to support Rust-based kernel drivers.',
    fullDescription: `Contributed to the <em>Rust for Linux</em> initiative. Recompiled and set up a custom version of Linux to support Rust-based kernel drivers, contributing to the integration of Rust into the Linux kernel, with plans for eventual submission to the Linux Kernel Mailing List (LKML). Allowed system developers to write custom Linux loadable kernel modules for thread-safe file operations, minimizing <code>unsafe</code> blocks while ensuring compatibility with cross-compilation.`,
    hasBlogPost: false,
    blogSlug: 'rust-linux-driver-support'
  },
  {
    id: 'weensyos-rust',
    title: 'Introducing WeensyOS in Rust',
    githubUrl: 'https://github.com/anton-mel/WeensyOS',
    period: 'May 2024 – Aug 2024',
    technologies: 'Operating Systems, Booloader, Rust, Teaching, x86-64',
    shortDescription: 'Redesigned core systems curriculum by re-engineering WeensyOS—a minimalist teaching kernel used across 6 Ivy League schools.',
    fullDescription: `Redesigned core systems curriculum by re-engineering <em>WeensyOS</em>—a minimalist teaching kernel created by Prof. Eddie Kohler at Harvard and used across 6 Ivy League to teach core OS concepts (adapted at Yale from Spring 2024). It runs on bare-metal x86-64 machines (QEMU emulated CPUs) with POSIX compatibility and newly added microkernel design. Rust-WeensyOS aims for a complete segfault-free experience, inspired by Rust OS pioneers like <a href="https://www.redox-os.org/" target="_blank" rel="noopener noreferrer">RedoxOS</a>. Its previous version presents the first known-to-me attempt to statically offload major core kernel management services via two foreign function interfaces (FFI).`,
    hasBlogPost: false,
    blogSlug: 'weensyos-rust-implementation'
  }
];
