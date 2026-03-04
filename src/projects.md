## The AI Researcher (TAR): A Multi-Agent AI System

*A research agent orchestrating only 4-node subagents to deliver hallucination-free, multi-modal insights.* | [Chat](https://the-ai-researcher.vercel.app/) | [Github](https://github.com/omm-prakash/The-AI-Researcher/)

### I. Agentic Workflow & Architecture

- Boosted throughput 60% via hierarchical routing of Lite/Reasoning LLMs based on query, to manage RPM constraints.
- Maximized factual accuracy by injecting 12k tokens/loop via a Tavily-driven deterministic web extraction pipeline.
- Slashed hallucinations by architecting parallel modality-specific sub-agents as tools than in sequential workflows.
- Refined multi-modal extraction using Whisper(Audio-STT), Llama-4-Scout-17b(Image), & Gemini-2.5 Flash(PDF).

### II. Scalable Data Flow & Optimization

- Reduced backend compute load by 70% by offloading Auth & DB operations to Supabase directly from the frontend.
- Achieved sub-second AI inference by orchestrating Groq & Google GenAI through optimized async FastAPI endpoints.
- Minimized request latency by implementing backend caching of Supabase chat history to bypass redundant DB lookups.

### III. System Design & Infrastructure

- Sustained 99.9% production uptime on Oracle Cloud E2.1.Micro by a 4GB swap hack and PM2 process management.
- Secured 100% data traffic via Nginx HTTPS/SSL termination & deployed decoupled frontend on Vercel for fast loading.
- Optimized resource utilization by tuning Uvicorn memory-recycling workers and async agent inferencing across calls.

## Powerformer: An Intelligent Fault Diagnosis System for AC Microgrids

[Github](https://github.com/omm-prakash/Powerformer)

- Architected a custom Graph Transformer & deployed in Super Computer for real-time fault detection & localization.
- Optimized processing latency to just 9 ms by engineering a high-throughput Python data ingestion & inference pipeline.
- Delivered a 94.9% F1-score in system reliability by integrating closed-loop, event-driven automated response protocols.

## Deep Learning Based Choledoch Cancer Cell Detection Paper

[Paper](https://doi.org/10.1364/OPTCON.527576)

- Advanced Choledoch cancer detection to a SOTA 73.27% IoU by implementing a 3D-UNet segmentation model.
- Segmented the cancerous portion in hyperspectral images of Choledoch tissue with deep learning models.
- Performed dimensionality reduction and noise filtration on microscopic hyperspectral data of 102 GB on HPC.
