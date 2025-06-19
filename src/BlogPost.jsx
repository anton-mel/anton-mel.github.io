import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './App.css';

export default function BlogPost() {
  const { id } = useParams();

  // Blog post data - this could be moved to a separate file or CMS
  const blogPosts = {
    'helios': {
      title: 'Multi-FPGA Management System: HeliosOS',
      subtitle: 'Building a distributed quantum error correction system',
      date: 'January 2025 – Present',
      categories: 'Multi-FPGA Systems, Quantum Error Correction, SoC Design',
      coverImage: 'public/helios.png',
      content: [
        {
          type: 'paragraph',
          text: 'Quantum error correction (QEC) is the cornerstone of practical quantum computing. However, the computational demands of real-time QEC decoding present a significant challenge. Traditional approaches struggle with the latency requirements and resource constraints of large-scale quantum systems.'
        },
        {
          type: 'paragraph',
          text: 'HeliosOS represents a breakthrough in this space—a first-of-its-kind multi-FPGA system designed specifically for real-time quantum error correction. By leveraging a distributed architecture across five Xilinx VMK-180 FPGAs, we\'ve created a system that can decode 100 logical qubits (d=5) faster than the measurement rate, making it practical for real-time quantum error correction.'
        },
        {
          type: 'image',
          src: 'public/helios.png',
          alt: 'HeliosOS System Overview',
          caption: 'HeliosOS distributed architecture using five Xilinx VMK-180 FPGAs'
        },
        {
          type: 'heading',
          text: 'Architecture Overview'
        },
        {
          type: 'paragraph',
          text: 'The system employs a hybrid tree-grid topology that minimizes latency for lattice surgery operations. This topology is crucial for maintaining the temporal requirements of quantum error correction, where every microsecond counts.'
        },
        {
          type: 'paragraph',
          text: 'At the heart of HeliosOS is our novel fusion-Union-Find algorithm. This approach to decoding merged logical qubits avoids redundant computations that plague traditional methods, resulting in significant performance improvements.'
        },
        {
          type: 'heading',
          text: 'Technical Challenges'
        },
        {
          type: 'paragraph',
          text: 'One of the primary challenges we faced was resource management across multiple FPGAs. Each VMK-180 FPGA has limited on-chip memory and computational resources, requiring careful partitioning of the decoding workload.'
        },
        {
          type: 'paragraph',
          text: 'We solved this through intelligent load balancing and dynamic resource allocation. The system continuously monitors the computational load on each FPGA and redistributes tasks as needed to maintain optimal performance.'
        },
        {
          type: 'heading',
          text: 'Performance Results'
        },
        {
          type: 'paragraph',
          text: 'Our preliminary results show that HeliosOS can achieve decoding latencies of under 1 microsecond for typical error patterns. This represents a significant improvement over existing solutions and brings us closer to the goal of fault-tolerant quantum computing.'
        },
        {
          type: 'paragraph',
          text: 'The distributed nature of the system also provides inherent fault tolerance—if one FPGA fails, the remaining FPGAs can continue processing with degraded but acceptable performance.'
        }
      ]
    },
    'huawei-visa': {
      title: 'Turning Point: Visa Hurdles Ended My Huawei Kernel R&D Internship Plans',
      subtitle: 'How international restrictions reshaped my career trajectory',
      date: 'December 2024',
      categories: 'Personal Experience, Career Development, International Work',
      coverImage: 'public/huawei.png',
      content: [
        {
          type: 'paragraph',
          text: 'In the spring of 2024, I received an exciting opportunity to join Huawei\'s kernel R&D team as an intern. The position promised hands-on experience with Linux kernel development, Rust integration, and cutting-edge systems programming—exactly the kind of work I\'ve been passionate about throughout my academic career.'
        },
        {
          type: 'image',
          src: 'public/huawei.png',
          alt: 'Huawei R&D Center',
          caption: 'Huawei\'s research and development facilities'
        },
        {
          type: 'list',
          items: [
            'Always have backup plans when pursuing international opportunities',
            'Geopolitical factors can significantly impact career decisions',
            'Setbacks can lead to unexpected and potentially better opportunities',
            'Flexibility and adaptability are crucial in today\'s global job market'
          ]
        },
        {
          type: 'paragraph',
          text: 'While I may never know what could have been at Huawei, I\'m grateful for the path this experience set me on. Sometimes the best opportunities come from the doors that close rather than the ones that open.'
        }
      ]
    },
    'fast-raft': {
      title: 'Fast-Raft: Hierarchical Consensus for Dynamic Datacenters',
      subtitle: 'Building a faster, more scalable consensus protocol',
      date: 'November 2024 – December 2024',
      categories: 'Distributed Systems, Go, AWS, gRPC, Terraform, Chaos Mesh',
      coverImage: 'public/FastRaftProtocol.pdf',
      content: [
        {
          type: 'paragraph',
          text: 'Consensus protocols are the backbone of distributed systems, ensuring that multiple nodes can agree on a single state even in the presence of failures. Traditional protocols like Raft and Paxos have served us well, but they struggle with the scale and dynamism of modern datacenters.'
        },
        {
          type: 'paragraph',
          text: 'Fast-Raft addresses these limitations through a hierarchical approach that optimizes for the characteristics of globally distributed, highly-dynamic systems like mobile networks and cloud infrastructure.'
        },
        {
          type: 'heading',
          text: 'The Problem with Traditional Consensus'
        },
        {
          type: 'paragraph',
          text: 'Traditional consensus protocols like Raft work well for small, stable clusters but face several challenges in modern environments:'
        },
        {
          type: 'list',
          items: [
            'High latency in geographically distributed deployments',
            'Poor performance with frequent membership changes',
            'Limited scalability beyond a few dozen nodes',
            'Inefficient handling of read-heavy workloads'
          ]
        },
        {
          type: 'heading',
          text: 'Fast-Raft Architecture'
        },
        {
          type: 'paragraph',
          text: 'Fast-Raft introduces a hierarchical structure that separates concerns between local and global consensus. Local clusters handle high-frequency operations efficiently, while a global layer coordinates across clusters.'
        },
        {
          type: 'paragraph',
          text: 'This design achieves a 2× speedup and a 5× increase in throughput compared to traditional Raft and Paxos algorithms in our benchmarks.'
        },
        {
          type: 'heading',
          text: 'Implementation Details'
        },
        {
          type: 'paragraph',
          text: 'Our implementation uses gRPC for efficient communication between nodes and provides a clean Go API that\'s easy to integrate into existing systems. We containerized cluster nodes and deployed them on AWS EKS using Terraform across three US regions.'
        },
        {
          type: 'paragraph',
          text: 'Performance improvements and fault tolerance were rigorously evaluated at scale using Chaos Mesh for fault injection and resilience testing.'
        }
      ]
    },
    'weensyos-rust': {
      title: 'WeensyOS in Rust: Teaching Operating Systems with Memory Safety',
      subtitle: 'Redesigning core systems curriculum with Rust',
      date: 'May 2024 – August 2024',
      categories: 'Operating Systems, Bootloader, Rust, Teaching, x86-64',
      coverImage: 'public/weensyosdemo.gif',
      content: [
        {
          type: 'paragraph',
          text: 'WeensyOS is a minimalist teaching kernel created by Prof. Eddie Kohler at Harvard and used across 6 Ivy League universities to teach core operating system concepts. When Yale adopted it for the Spring 2024 semester, I saw an opportunity to modernize the curriculum with Rust.'
        },
        {
          type: 'image',
          src: 'public/weensyosdemo.gif',
          alt: 'WeensyOS Demo',
          caption: 'WeensyOS running with Rust components'
        },
        {
          type: 'paragraph',
          text: 'The goal was ambitious: redesign core systems curriculum by re-engineering WeensyOS to run on bare-metal x86-64 machines with POSIX compatibility and a microkernel design, all while maintaining the educational value of the original system.'
        },
        {
          type: 'heading',
          text: 'Why Rust?'
        },
        {
          type: 'paragraph',
          text: 'Rust\'s memory safety guarantees make it ideal for systems programming, especially in educational contexts where segfaults can be confusing and demotivating for students. By using Rust, we can focus on teaching OS concepts rather than debugging memory corruption bugs.'
        },
        {
          type: 'paragraph',
          text: 'The project aims for a complete segfault-free experience, inspired by Rust OS pioneers like RedoxOS, Plan 9, Minix, seL4, BSD, and Linux.'
        },
        {
          type: 'heading',
          text: 'Technical Implementation'
        },
        {
          type: 'paragraph',
          text: 'The implementation uses two foreign function interfaces (FFI) to statically offload major core kernel management services. This represents the first known attempt to transition portions of a teaching kernel to Rust while maintaining compatibility with existing C-based components.'
        },
        {
          type: 'paragraph',
          text: 'Key features include:'
        },
        {
          type: 'list',
          items: [
            'Memory-safe kernel components written in Rust',
            'Compatibility with existing C-based bootloader and hardware abstraction',
            'POSIX-compliant system calls',
            'Microkernel architecture for better modularity',
            'Comprehensive test suite for educational use'
          ]
        },
        {
          type: 'heading',
          text: 'Educational Impact'
        },
        {
          type: 'paragraph',
          text: 'The Rust version of WeensyOS has been successfully integrated into Yale\'s CPSC 323 course, where it helps students learn operating system concepts without the traditional debugging overhead. Students can focus on understanding scheduling, memory management, and file systems rather than chasing down memory bugs.'
        }
      ]
    }
  };

  const post = blogPosts[id];

  if (!post) {
    return (
      <div className="app">
        <header className="header">
          <div className="scroll-progress" style={{ width: '0%' }} />
        </header>
        <main className="main-content">
          <div className="content-wrapper">
            <div className="blog-post-error">
              <h1>Post not found</h1>
              <p>The blog post you're looking for doesn't exist.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const renderContent = (block, index) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="blog-post-paragraph">
            {block.text}
          </p>
        );
      case 'heading':
        return (
          <h2 key={index} className="blog-post-heading">
            {block.text}
          </h2>
        );
      case 'image':
        return (
          <figure key={index} className="blog-post-figure">
            <img 
              src={block.src} 
              alt={block.alt}
              className="blog-post-image"
            />
            {block.caption && (
              <figcaption className="blog-post-caption">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      case 'list':
        return (
          <ul key={index} className="blog-post-list">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex} className="blog-post-list-item">
                {item}
              </li>
            ))}
          </ul>
        );
      case 'code':
        return (
          <pre key={index} className="blog-post-code">
            <code>{block.text}</code>
          </pre>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="scroll-progress" style={{ width: '0%' }} />
      </header>
      <main className="main-content">
        <div className="content-wrapper">
          <article className="blog-post">            
            <h1 className="blog-post-title">{post.title}</h1>
            {post.subtitle && (
              <h2 className="blog-post-subtitle">{post.subtitle}</h2>
            )}
            
            <div className="blog-post-meta">
              <span className="blog-post-date">{post.date}</span>
              <span className="blog-post-categories">{post.categories}</span>
            </div>

            <img 
              src={post.coverImage} 
              alt={post.title}
              className="blog-post-cover-image"
            />

            <div className="blog-post-content">
              {post.content.map((block, index) => renderContent(block, index))}
            </div>

            <div className="blog-post-footer">
              <Link to="/blog" className="blog-block-readmore">← Back to blog</Link>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
