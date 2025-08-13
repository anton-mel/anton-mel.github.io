export const projects = [
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
    fullDescription: `Contributed to the <em>Rust for Linux</em> initiative. Recompiled and set up a custom version of <strong>Linux to support Rust-based kernel drivers,</strong> contributing to the integration of Rust into the Linux kernel, with plans for eventual submission to the Linux Kernel Mailing List (LKML). Allowed system developers to write custom Linux loadable kernel modules for thread-safe file operations, minimizing <code>unsafe</code> blocks while ensuring compatibility with cross-compilation.`,
    hasBlogPost: true,
    blogSlug: 'rust-linux-driver-support'
  },
  {
    id: 'weensyos-rust',
    title: 'Introducing WeensyOS in Rust',
    githubUrl: 'https://github.com/anton-mel/WeensyOS',
    period: 'May 2024 – Aug 2024',
    technologies: 'Operating Systems, Booloader, Rust, Teaching, x86-64',
    shortDescription: 'Redesigned core systems curriculum by re-engineering WeensyOS—a minimalist teaching kernel used across 6 Ivy League schools.',
    fullDescription: `<strong>Redesigned core systems curriculum</strong> by re-engineering <em>WeensyOS</em>—a minimalist teaching kernel created by Prof. Eddie Kohler at Harvard and used across 6 Ivy League to teach core OS concepts <strong>(adapted at Yale from Spring 2024).</strong> It runs on bare-metal x86-64 machines (QEMU emulated CPUs) with POSIX compatibility and newly added microkernel design. Rust-WeensyOS aims for a complete segfault-free experience, inspired by Rust OS pioneers like <a href="https://www.redox-os.org/" target="_blank" rel="noopener noreferrer">RedoxOS</a>. Its previous version <strong>presents the first known-to-me attempt</strong> to statically offload major core kernel management services via two foreign function interfaces (FFI), as a proof of concept for the feasibility of transitioning portions of the Linux kernel to Rust.`,
    hasBlogPost: true,
    blogSlug: 'weensyos-rust-implementation'
  }
];
