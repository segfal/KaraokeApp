# KaraokeApp Documentation

Welcome to the KaraokeApp documentation! This directory contains comprehensive information about the project architecture, implementation details, and optimization journey.

## Documentation Structure

### 📋 Project Information
- **[project-overview.md](./project-overview.md)** - High-level project description, features, and technology stack
- **[getting-started.md](./getting-started.md)** - Setup instructions and usage guide
- **[technical-details.md](./technical-details.md)** - Deep dive into implementation specifics

### 🚀 Optimization Journey
- **[optimization-notes.md](./optimization-notes.md)** - Detailed notes on Phase 1-2 improvements, before/after comparisons

## Architecture Diagrams

The `/diagrams` directory contains Mermaid diagrams illustrating:

- **[webrtc-architecture.md](../diagrams/webrtc-architecture.md)** - WebRTC performance optimizations
- **[socket-optimization.md](../diagrams/socket-optimization.md)** - Socket.IO event flow improvements  
- **[redux-simplification.md](../diagrams/redux-simplification.md)** - State management cleanup
- **[system-cleanup.md](../diagrams/system-cleanup.md)** - Auth removal architecture
- **[project-summary.md](../diagrams/project-summary.md)** - Complete optimization overview

## Quick Reference

### Key Achievements
- ✅ **4-6 user video support** (up from 2-3)
- ✅ **70%+ socket event reduction** through debouncing/throttling
- ✅ **4-6x bandwidth savings** via shared MediaStream
- ✅ **Simplified Redux state** (5 arrays → 2 properties)
- ✅ **Auth-free architecture** focused on core functionality

### Core Technologies
- **Frontend**: React + Redux + PeerJS + Socket.IO Client
- **Backend**: Node.js + Express + Socket.IO + PostgreSQL
- **Real-time**: WebRTC for video, Socket.IO for synchronization
- **Video**: YouTube API integration

### Performance Features  
- **Adaptive Quality**: Auto-downgrade to audio-only on poor connections
- **Connection Reuse**: RTCPeerConnection pooling
- **Smart Debouncing**: 300ms pause/resume, 1Hz queue updates
- **Heartbeat System**: 30s ping with exponential backoff reconnection

---

For additional questions or contributions, refer to the specific documentation files above.