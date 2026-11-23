window.RESUME = {
  name: "Anton Melnychuk",
  summary: "Hardware and systems engineer: RTL, physical design, board bring-up and GPU inference systems. B.S. in Electrical Engineering & Computer Science, Yale University, May 2026.",
  contact: [
    { label: "Email", text: "anton.melnychuk2@gmail.com", href: "mailto:anton.melnychuk2@gmail.com", copy: true },
    { label: "GitHub", text: "github.com/anton-mel", href: "https://github.com/anton-mel" },
    { label: "LinkedIn", text: "linkedin.com/in/antonmelnychuk", href: "https://www.linkedin.com/in/antonmelnychuk/" },
    { label: "Location", text: "Santa Clara, CA" }
  ],
  education: [
    {
      name: "Yale University",
      place: "New Haven, CT",
      lines: [
        { text: "B.S. in Electrical Engineering & Computer Science, GPA 3.7/4.0", date: "May 2026" },
        { text: "Admitted to Ph.D. in Computer Science, Sterling Prize Fellowship", date: "2026 (withdrew)" }
      ],
      coursework: ["Computer Architecture", "VLSI Design", "Operating Systems", "Computer Networks", "AI Infra Systems"]
    }
  ],
  experience: [
    {
      name: "Stealth Startup",
      note: "Yale spin-out",
      place: "San Jose, CA",
      lines: [{ text: "Member of Technical Staff", date: "Sep. 2026 – Present" }],
      bullets: [
        "Building [Pie](https://github.com/pie-project/pie), an open-source LLM inference engine that runs Hugging Face models on all major platforms.",
        "Scaled inference across GPUs with tensor/expert parallelism, NVLink/PCIe collectives and KV-cache transfer over RDMA."
      ]
    },
    {
      name: "Async VLSI Lab",
      place: "New Haven, CT",
      lines: [{ text: "Researcher" }],
      subs: [
        {
          name: "Closed-Loop Seizure Neurostimulator",
          role: "Project Lead",
          date: "Jul. 2025 – Present",
          bullets: [
            "Led a NeuroPace RNS-class closed-loop seizure [neurostimulator](https://github.com/VerifyHalo/RESPNS-PCB): architecture, verification and ongoing in vivo testing.",
            "Tested a 32-ch NEO seizure detector on Artix-7 (100.8 MHz) with SVA and random tests; Intan DAQ input over SPI/LVDS.",
            "Designed an 8-layer HDI rigid-flex implant PCB modeled at 147 µA, ~40 days/charge (Princeton poster ’26).",
            "Built a per-rail power model with Monte Carlo; picked nA-quiescent parts; power-gated the stimulator from 4.7 mA to 7 µA."
          ]
        },
        {
          name: "Tensor Addressable Bridge",
          role: "with Microsoft Research Asia",
          date: "Mar. 2026 – May 2026",
          bullets: [
            "Contributed to [FengHuang](https://github.com/anton-mel/fenghuang)’s bridge RTL (crossbar, in-memory AllReduce); Yosys: 1.6 mm², 169 MHz on IHP 130 nm.",
            "Modeled next-layer weight prefetch from LPDDR6 to size GPUs by FLOPs, not HBM: Qwen3-235B on 4 H100s instead of 8."
          ]
        }
      ]
    },
    {
      name: "Riverlane Ltd.",
      place: "Cambridge, MA",
      lines: [{ text: "Quantum Research Intern", date: "May 2026 – Aug. 2026" }],
      bullets: [
        "Paired GPU AI pre-decoders (NVIDIA Ising) with a Union-Find decoder on Xilinx FPGAs at sub-1 µs latency.",
        "Streamed syndromes FPGA-to-L40 via GPUDirect RDMA P2P over PCIe, using existing DMA IP (AXI4 bursts, AXI4-Lite).",
        "Roofline-modeled Union-Find on GPU vs. wafer-scale: Cerebras-style mesh decodes distance 95 in real time (APS Conf. ’27)."
      ]
    },
    {
      name: "Yale ECE Department",
      place: "New Haven, CT",
      lines: [
        { text: "Teaching Assistant, CPSC 3230 Systems Programming & Computer Organization (2 sem.)", date: "Jan. 2025 – Dec. 2025" },
        { text: "Teaching Assistant, CPSC 4200/ECE 4201 Computer Architecture", date: "Jan. 2026 – May 2026" }
      ]
    }
  ],
  projects: [
    {
      name: "Longhorn Silicon",
      lines: [{ text: "Architecture & RTL-to-GDS (team of 3)", date: "Jul. 2026 – Present" }],
      bullets: [
        "Co-designed and verified [Lambda](https://github.com/LonghornSilicon)’s 4-bit KV-cache RTL feeding its 8×8 systolic array: ~3.8× less LPDDR5X traffic.",
        "Fixed a trial-PnR routing stall (LibreLane/OpenROAD, Sky130) by sharing one FP16 divider: 4.5× fewer cells, bit-exact.",
        "Building one PE of a TPU-style 65,536-MAC array: Q8.8, weight-stationary, double-buffered weights, spec to GDS."
      ]
    },
    {
      name: "MOS 6502 CPU",
      lines: [{ text: "Full-Custom Physical Design (team of 3)", date: "Oct. 2025 – Dec. 2025" }],
      bullets: [
        "Laid out a simplified [MOS 6502](https://github.com/anton-mel/6502MOS) (Apple II, NES) full-custom in Magic: 6.8k transistors, 0.11 mm², 180 nm SCMOS.",
        "Wrote microcode for its ROM-based control unit; passes IRSIM switch-level tests at 77 MHz, 4.1 mW (1.8 V).",
        "Designed and hand-assembled a KiCad test board (VGA video out, ~512 KB SRAM) to bring up IHP SG13G2 6502 silicon."
      ]
    },
    {
      name: "Out-of-Order PARCv2 CPU",
      lines: [{ text: "RTL Microarchitecture (team of 2)", date: "Jan. 2025 – May 2025" }],
      bullets: [
        "Extended a bypassed 5-stage [PARCv2 pipeline](https://github.com/anton-mel/OoO-PARCv2) in Verilog to 2-wide superscalar issue with a scoreboard; up to 25% faster.",
        "Built a 16-entry reorder buffer for in-order commit and ROB bypassing, removing out-of-order WAW hazards.",
        "Added branch speculation (ROB squash on mispredict, speculative scoreboard updates), verified with directed hazard tests."
      ]
    }
  ],
  skills: [
    { label: "Languages", items: "SystemVerilog/Verilog, VHDL, C/C++, CUDA, Rust, Python, Tcl, Perl." },
    { label: "RTL & verification", items: "microcode, AXI4/AXI4-Lite, SPI/LVDS, crossbars & arbiters, CDC, UVM, SVA, self-checking testbenches." },
    { label: "Simulation & lint", items: "Questa/ModelSim, Vivado XSim, Verilator (lint), Icarus Verilog, cocotb, IRSIM." },
    { label: "Synthesis & PD", items: "Cadence Genus, Yosys, OpenROAD/LibreLane, STA/timing closure, Magic VLSI, Virtuoso, DRC/LVS sign-off." },
    { label: "PCB & lab", items: "KiCad, HDI/rigid-flex, ERC/DRC, board bring-up, oscilloscope, logic analyzer, soldering/rework." },
    { label: "Systems", items: "PCIe/DMA, HBM/LPDDR5X, SerDes/UCIe, AMD Zynq/Versal, Vivado, PetaLinux, Nsight, Docker, Kubernetes, Linux." },
    { label: "Training", items: "Accelerated Networking for AI Infrastructure, NVIDIA GTC 2026." }
  ]
};
