# KaraokeApp - Project Overview

A real-time multiplayer karaoke application with WebRTC video chat and synchronized music playback.

## Core Features

### 🎤 Karaoke Functionality
- **YouTube Integration**: Search and queue videos for karaoke sessions
- **Room Management**: Create/join rooms with unique room IDs
- **Queue System**: Add, remove, and manage video queue with live updates
- **Synchronized Playback**: All users see the same video at the same time

### 📹 Video Chat
- **Multi-User Video**: Supports 4-6 concurrent video participants
- **WebRTC Integration**: Peer-to-peer video connections using PeerJS
- **Adaptive Quality**: Auto-downgrades to audio-only on poor connections
- **Media Controls**: Mute/unmute audio and enable/disable video

### 💬 Real-Time Communication
- **Socket.IO**: Real-time messaging and room synchronization
- **Chat System**: Live text chat within karaoke rooms
- **Room State**: Persistent room state with reconnection support

## Technology Stack

### Frontend
- **React** - UI framework
- **Redux** - State management (simplified queue system)
- **Socket.IO Client** - Real-time communication
- **PeerJS** - WebRTC wrapper for video chat
- **Tailwind CSS** - Styling

### Backend
- **Node.js + Express** - Server framework
- **Socket.IO** - Real-time server
- **PostgreSQL + Sequelize** - Database
- **YouTube API** - Video search and metadata

## Architecture Highlights

### Performance Optimizations
- **Shared MediaStream**: Single camera/mic stream shared across all peer connections
- **Connection Reuse**: RTCPeerConnection instances reused instead of recreated
- **Event Debouncing**: 300ms debounce on pause/resume controls
- **Update Throttling**: 1Hz limit on queue/participant updates
- **Stats Monitoring**: 5-second intervals with adaptive quality downshift

### Simplified State Management
- **Single Queue**: Replaced 5 redundant arrays with simple `queue + nowPlaying`
- **Clean Actions**: ADD_TO_QUEUE, ADVANCE_QUEUE, REMOVE_FROM_QUEUE
- **70% State Reduction**: Eliminated complex filtering and duplicate data

### Streamlined Architecture
- **Auth-Free**: Removed all authentication complexity for focus on core features
- **Clean Dependencies**: Minimal package.json without passport/session overhead
- **Direct Socket Rooms**: Username-based room joining without user accounts