#  Real-Time Performance Dashboard

A high-performance, *real-time data visualization dashboard* built with *Next.js 14, **TypeScript, and **Canvas*.  
Designed to handle *10,000+ data points* while maintaining *60 FPS* rendering and smooth user interaction.

---

##  Features

-  *Real-Time Streaming* – Seamless live data updates powered by a simulated data stream  
-  *Multiple Visualization Modes* – Switch between line, bar, scatter, and heatmap charts instantly  
-  *Aggregation Controls* – Filter by time range, performance category, and aggregation interval  
-  *Optimized Rendering* – Canvas-based charting for ultra-low latency and steady frame rates  
-  *Interactive Data Table* – Live table synced with the visualization in real time  
-  *Component-Driven Design* – Modular architecture with reusable hooks and UI components  
-  *Built for Performance Analysis* – Ideal for dashboards, monitoring tools, or analytics systems  

---

##  Tech Stack

| Layer | Technologies Used |
|:--|:--|
| *Frontend* | Next.js 14, React 18, TypeScript |
| *Rendering* | Canvas API, React Hooks, Virtualization |
| *Data Handling* | Custom WebSocket-like stream simulator |
| *Styling* | Tailwind CSS |
| *Performance* | React.memo, useCallback, useMemo, requestAnimationFrame |
| *Deployment* | Vercel |

---

## Installation

Clone the repository and start the development server:

```bash
git clone https://github.com/EASHITA1/performance-dashboard.git
cd performance-dashboard
npm install
npm run dev