# WebRTC Performance Architecture (Phase 1)

This diagram shows the optimized WebRTC architecture implemented to support 4-6 concurrent video users.

```mermaid
graph TB
    A[PeerContext Provider] --> B[Shared MediaStream]
    B --> C[User A Video]
    B --> D[User B Video] 
    B --> E[User C Video]
    
    F[Peer Connection Manager] --> G[Reused RTCPeerConnection]
    G --> H[Stats Monitor - 5s intervals]
    H --> I{Bitrate < 100kbps?}
    I -->|Yes| J[Disable Video → Audio Only]
    I -->|No| K[Maintain 720p/30fps]
    
    L[getUserMedia Call] --> M{Quality Attempt}
    M -->|Success| N[1280x720@30fps]
    M -->|Fallback| O[Audio Only]
    
    style B fill:#e1f5fe
    style G fill:#f3e5f5
    style H fill:#fff3e0
```

## Key Features

- **Single Shared MediaStream**: Reduces bandwidth by 4-6x by sharing one stream across all peer connections
- **Peer Connection Reuse**: Eliminates connection thrash by reusing RTCPeerConnection instances
- **Adaptive Quality**: Monitors stats every 5 seconds and downgrades to audio-only when bitrate < 100kbps
- **Fallback Strategy**: Gracefully falls back to audio-only if camera access fails