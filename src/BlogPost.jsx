import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom';
import './App.css';
import ScrollProgressHeader from './components/ScrollProgressHeader';
import Footer from './components/Footer';
import SidePanel from './components/SidePanel';

export default function BlogPost() {
  const { id } = useParams();
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScrollBtn = () => {
      setShowScrollTop(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScrollBtn, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollBtn);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setScrollProgress(total > 0 ? (current / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Blog post data - this could be moved to a separate file or CMS
  const blogPosts = {
    'ooo-parcv2': {
      title: 'From In-Order to Out-of-Order: Building a Speculative PARCv2 Central Processing Unit (CPU)',
      subtitle: 'Reorder Buffer, scoreboarding, and branch speculation for measurable speedups',
      date: 'December 2024 – January 2025',
      categories: 'Computer Architecture, Verilog, Out-of-Order Execution, Speculation',
      content: [
        { type: 'heading', text: 'Lab 4: Out of Order PARCv2 Processor' },
        { type: 'paragraph', text: 'This project is part of the Computer Architecture course at Yale. Over the semester, we implemented the PARCv2 ISA and built the pipeline bottom‑up—bypassing, superscalar issue, and finally out‑of‑order execution with speculation and precise exceptions. Along the way, we studied how industry designs high‑performance, energy‑efficient CPUs and accelerators (e.g., GPUs), weaving in core topics like memory hierarchies, virtual memory/translation, on‑chip networks, and coherence, with a forward look at ML‑guided resource management and emerging paradigms like neuromorphic computing.' },
        { type: 'heading', text: 'Abstract' },
        { type: 'paragraph', text: 'In this project, we implement a ROB for an I2O2 processor to make it an I2OI processor. We also modify this processor to allow for speculative processing of the instructions immediately following a branch instruction. The speculative processor uses the ROB which is modified to account for speculatively allocated instructions and a scoreboard which we modified to take speculative instructions in the issue stage only after they have been resolved. The ROB makes the commit stage strictly in order, which ensures that WAW hazards are not an issue for the OoO processor, including when high latency writes occur immediately before a low latency write. The assembly and benchmark tests demonstrate correctness, while our custom tests also show resilience to specific edge cases. The OoO processor gave incredible speedup from having a 3-stage muldiv unit compared to byp’s iterative unit, but the actual speedup from out of order execution is minimal. In the two benchmarks with branching, speculative processing gives a 5.5% speedup, but there is a performance hit with the new issue stage since consecutive instructions with a dependency cannot immediately bypass from Issue.' },
        { type: 'heading', text: 'Design' },
        { type: 'heading', text: 'Part 1' },
        { type: 'paragraph', text: 'We first implemented an ROB to make commits in-order for the OoO processor. This ensures that the write-after-write hazards from the test we designed is no longer an issue. The ROB keeps a circular queue of capacity 16, with each entry containing information about the allocated instruction. When an alloc request is made, the ROB gives the processor the slot that was allocated, which allows the processor to refer to it for later parts of the process. Namely, once the instruction corresponding to a slot has been executed and is in the writeback stage, the processor sends a fill request to the ROB which lets the ROB mark the slot as no longer pending. Throughout this time, whenever the ROB head is at a non-pending but valid entry, it can direct the processor to commit the data to the regfile. We did not differ from the given ROB specs as we did not feel there was a better choice and the design is fairly simple.' },
        { type: 'heading', text: 'Part 2' },
        { type: 'paragraph', text: 'We add a spec column to the ROB and an additional set of inputs to allow the control unit to resolve speculative slots. Since at most one instruction is speculative in our processor, only one such input is needed. Then, the ROB adjusts the appropriate entry to either be no longer speculative or to now be invalid, and the commit logic now also skips any invalid instructions. We only skip a single entry in a cycle since there are no capacity concerns in the ROB and to keep commit logic simple. We believe that this does not stray from the intended modifications.' },
        { type: 'paragraph', text: 'We also had to make changes to the scoreboard, despite the spec stating that this would not be necessary. When a branch is mispredicted, allowing speculative instructions into the scoreboard creates incorrect bypassing, whereas correct predictions need to be added to the scoreboard to ensure stale values are not bypassed in favor of the no-longer speculative value. To solve this, we added an interface for the I stage to add speculative instructions in the scoreboard once the branch is confirmed to be not taken. In theory, the entire scoreboard logic could have been moved to the Issue stage, but this felt like a quick solution for the purpose of this project.' },
        { type: 'paragraph', text: 'Besides these two changes, and any additional wires in the control side to connect to the new interfaces in the ROB and scoreboard, we did not change anything from the pv2spec starter code given. A clear extension of this project would be to move the issuing logic from Decode to Issue, which would also improve a key slowdown noted later and remove the added interface from the scoreboard.' },
        { type: 'heading', text: 'Testing Methodology' },
        { type: 'image', src: '/public/figure1.png', alt: 'Figure 1: Demonstration of src0_byp_mux_sel = 0b100, indicating bypassing from ROB', caption: 'Figure 1: Demonstration of src0_byp_mux_sel = 0b100, indicating bypassing from ROB' },
        { type: 'paragraph', text: 'We start by creating a simple parcv2-ooo.S test that writes to the same destination twice: a 4‑cycle MUL stores 0 to $1, then a 1‑cycle ADDIU stores 5 to $1; after several NOPs we read $1. Thus, in the supplied I2O2 core, results are written to the register file as soon as each pipe finishes, so the fast ADDIU commits first, then the slower MUL commits later and overwrites $1; the final read returns 0 and the TEST_CHECK_EQ fails. With a new reorder buffer we should expect MUL results to wait in the ROB until earlier instructions are committed, making the final value 5 and the test passes. Note, all original PARCv2 tests still pass on I2O2 because they never read a register after multiple pending writes to that same register, so out‑of‑order commits cannot change their observed behavior.' },
        { type: 'paragraph', text: 'Next, parcv2-rob-byp.S is a test that bypasses out of the ROB before commit rather than waiting for commit. After a load (LH) writes to register but before the instruction commits, a dependent instruction reads it again. In Figure 1, we correctly observe the src0_byp_mux_sel to be 5, which is the expected value to bypass from the ROB.' },
        { type: 'paragraph', text: 'We also wrote parcv2-waw.S, which tests a WAW hazard scenario that even the original, incorrect OoO processor. A MUL writes to register 2, and later an ADDIU overwrites it. However, there are enough cycles between them that the second write arrives after the first one has completed or is properly tracked in the ROB. This test validates that WAW hazards are correctly resolved when instructions are sufficiently spaced apart, even in the old OoO.' },
        { type: 'paragraph', text: 'Finally, parcv2-byp.S shows a case where the bypass-only design achieves better IPC than both the speculative and OoO processors. This occurs because bypass avoids stalls caused by writeback resource contention or ROB commit delays by relying solely on fast forwarding paths. In this case, even though the OoO has more complex mechanisms, its overhead results in lower throughput under certain conditions compared to a simple pipeline.' },
        { type: 'heading', text: 'Evaluations' },
        { type: 'code', text: 'Bin Search    Complex Mult    Masked Filter    Vvadd\nCycles  IPC   Cycles   IPC     Cycles  IPC      Cycles  IPC\nByp   1749 0.731275  15312 0.121735  13832 0.325260   473 0.961945\nOoO   1695 0.754572   2562 0.727557   6248 0.720070   513 0.886940\nSpec Starter\n      2464 0.519075   3138 0.594009   7693 0.584817   524 0.868321\nSpec  2292 0.612129   3138 0.594009   7381 0.635686   524 0.868321' },
        { type: 'heading', text: 'Discussion' },
        { type: 'image', src: '/public/figure2.png', alt: 'Figure 2: An updated pipeline which adds the ROB after the writeback stage and separates writeback from the commit logic', caption: 'Figure 2: An updated pipeline which adds the ROB after the writeback stage and separates writeback from the commit logic' },
        { type: 'paragraph', text: 'At first glance, the speedup between byp and OoO on Complex Mult and Masked Filter was shocking, especially since the 83% speedup in Complex Mult seems impossible. However, we realized that most of this was the use of an iterative muldiv unit in byp compared to the 3 stage unit in OoO. On the other two benchmarks, the muldiv unit is not used. Then, the speedup from executing multiple instructions at once is much less, and slows down the processor on Vvadd. This occurs due to the writeback hazard demonstrated in parcv2-byp.S. To fix such an issue, it could be possible to have multiple instructions in the writeback stage filling the ROB at the same time, though this would need to involve modifying the ROB further.' },
        { type: 'paragraph', text: 'Of note is also the new Issue stage that the spec code has compared to the OoO processor. The biggest issue with the Issue stage is that the processor cannot bypass out of the I stage because the result will not yet be available. This causes an extra cycle of stall if a consecutive instruction relies on the result of the previous instruction, which explains the huge slowdown between the OoO processor and the spec processor. However, if the issue stage was fully equipped to do out-of-order issuing, then instructions could be sent from the D stage without yet having all operands available, which would avoid the aforementioned stall. Thus, this slowdown is not a concern given the knowledge that it can be removed with further work.' },
        { type: 'paragraph', text: 'This project shows that improving IPC without changing clock speed and instructions per program becomes difficult and narrows to include only certain applications, such as branches, which means not all benchmarks see any improvements. In some cases, such as adding OoO processing, there can even be unintentional slowdowns due to new hazards. However, it is good to note that this could likely be rectified with allowing multiple instructions in writeback, provided the ROB changes appropriately. Of course, this is a good demonstration that increased complexity may not actually yield better results. While out of order execution and parallelizing instructions across multiple pipelines sounds wonderful on paper, this implementation may not have given as strong of an improvement as hoped for.' },
        { type: 'paragraph', text: 'From this, we see that the Iron Law again holds true. In order to increase IPC without changing clock speed and instructions per program, we must introduce further complexity and logic because this is not usually something that we can get for free. Indeed, the more logic we need to do in a single cycle, now including updating the ROB and maintaining its data, takes more time in a cycle and risks needing to lengthen cycle time as logic complexity increases.' },
      ]
    },
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
          text: "Rust's memory safety guarantees make it ideal for systems programming, especially in educational contexts where segfaults can be confusing and demotivating for students. By using Rust, we can focus on teaching OS concepts rather than debugging memory corruption bugs."
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
    },
    'perceptron-branch-prediction': {
      title: 'Research Paper Summary: Dynamic Branch Prediction with Perceptrons',
      subtitle: 'CPSC 420/520 · Anton Melnychuk · March 17, 2025',
      date: 'March 17, 2025',
      categories: 'Branch Prediction, Perceptron, Computer Architecture',
      content: [
        { type: 'heading', text: 'Problem Statement' },
        { type: 'paragraph', text: 'Modern processors use speculative execution to maximize instruction-level micro-parallelism (ILP). Classic dynamic predictors (e.g., Yeh–Patt gshare, bi-mode) use two-bit saturating counters in pattern history tables (PHTs). When counter updates fail to capture true branch behavior, mispredictions flush 10–20 in-flight instructions, incurring large penalties.' },
        { type: 'paragraph', text: 'Two core limitations hinder these predictors: (1) Exponential resource scaling with history length h, since indices are treated as binary strings—O(2^h)—which limits long-distance correlation capture; and (2) Aliasing, where different branches collide in the same counter entry, destructively interfering with each other’s training.' },
        { type: 'paragraph', text: 'Jimenez and Lin propose replacing counters with perceptrons—simple machine learning models—that learn linear correlations over global history with weights. This yields linear hardware scaling O(h) and reduces aliasing via weight-based correlation learning, targeting better accuracy for long-term dependencies at practical hardware cost.' },
        { type: 'heading', text: 'Importance' },
        { type: 'paragraph', text: 'Raising predictor accuracy sustains deeper speculation and higher ILP. Conventional predictors scale poorly: e.g., increasing gshare history from 15 to 18 bits doubles PHT size (32K→64K entries) yet still fails to capture long-range correlations spanning hundreds of instructions. On SPEC, gshare (18-bit, 64KB) mispredicts 5.20%, while perceptrons (62-bit) reduce this to 4.64% (Figure 7). For modern AI, DB, and OOP workloads with deep control flow and indirect branches, perceptrons’ longer effective histories are crucial.' },
        { type: 'heading', text: 'Prior Work' },
        { type: 'paragraph', text: 'Two-level adaptive schemes (gshare, bi-mode), hybrids (e.g., Alpha 21264 tournament), BTB partial tags/PC-offsets, RAS, and variable-length path predictors advanced accuracy but hit scaling limits or required impractical compiler co-design. Long-distance correlations and efficient hardware use remained unresolved.' },
        { type: 'heading', text: 'Novelty and Contributions' },
        { type: 'paragraph', text: 'Perceptrons model branch outcomes as thresholded weighted sums of history bits, naturally aligning with additive effects (e.g., loop iterations biasing a branch). The paper shows most branches are linearly separable on SPEC, justifying linear models and guiding hybrid designs. It derives an empirical relation between optimal history length and training threshold (θ ≈ 1.93h + 14), enabling principled tuning.' },
        { type: 'paragraph', text: 'Architecturally, the design exploits bipolar inputs (−1/+1) to replace multipliers with signed adders and decouples weight updates from critical prediction paths, enabling single-cycle predictions even with 62-bit histories. Linear resource scaling turns perceptrons from a niche idea into a viable alternative to counter-based predictors.' },
        { type: 'heading', text: 'Strengths and Weaknesses' },
        { type: 'paragraph', text: 'Strengths: scalable O(h) storage, longer histories (28-bit at 4KB; 62-bit at 64KB), lower mispredict rates (e.g., 6.89% at 4KB—10.1% better than gshare—Figure 3), and faster training (≈80% accuracy within 10 executions). Weaknesses: linear separability limits (≈16% of branches show non-linear patterns), context-switch sensitivity, and hybrid resource partitioning complexity; power/area comparisons are not fully explored.' },
        { type: 'paragraph', text: 'Overall: hybrid predictors that combine perceptrons with traditional schemes capture both linearly separable and non-linear patterns, reshaping the design space for practical high-ILP speculation.' },
        { type: 'heading', text: 'Resources' },
        { type: 'paragraph', text: '1) CPSC 420/520 Lecture 7: Branch Prediction. 2) D. A. Jimenez and C. Lin, “Dynamic Branch Prediction with Perceptrons,” HPCA 2001 (doi:10.1109/HPCA.2001.903263).' },
        { type: 'image', src: '/public/charts.png', alt: 'Perceptron vs. gshare summary charts', caption: 'Summary charts illustrating misprediction rate vs. budget and history length.' }
      ]
    },
  };

  const post = blogPosts[id];

  if (!post) {
    return (
      <div className="app">
        <header className="header">
          <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
        </header>
        <main className="main-content">
          <div className="content-wrapper">
            <div className="not-found-container">
              <h1 className="not-found-title">Page Not Found</h1>
              <p className="not-found-message">
                The page you're looking for doesn't exist or may have been moved.
              </p>
              <div className="not-found-actions">
                <Link to="/blog" className="not-found-btn">
                  Back to Projects
                </Link>
                <Link to="/" className="not-found-btn secondary">
                  Home
                </Link>
              </div>
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
    <>
      <div className="app">
        <ScrollProgressHeader />
        <main className="main-content">
          <div className="content-wrapper">
            <SidePanel />
            <section className="main-section" id="blogpost">
            <div className="back-link-container">
              <Link to="/blog" className="back-link">← Back to Blog</Link>
            </div>
            <article className="blog-post">            
              <h1 className="blog-post-title">{post.title}</h1>
              {post.subtitle && (
                <h2 className="blog-post-subtitle">{post.subtitle}</h2>
              )}
              
              <div className="blog-post-meta">
                <span className="blog-post-date">{post.date}</span>
                <span className="blog-post-categories">{post.categories}</span>
              </div>

              {post.coverImage && (
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="blog-post-cover-image"
                />
              )}

              <div className="blog-post-content">
                {post.content.map((block, index) => renderContent(block, index))}
              </div>

              
            </article>
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
    </>
  );
}
