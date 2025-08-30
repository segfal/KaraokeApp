# System Architecture - Auth Removal (Phase 2)

This diagram shows the streamlined architecture after removing all authentication components.

```mermaid
graph TB
    subgraph "REMOVED Components 🗑️"
        R1[backend/auth/]
        R2[backend/api/user.js]
        R3[backend/db/models/user.js]
        R4[frontend/Login.jsx]
        R5[frontend/Signup.jsx]
        R6[frontend/Profile.jsx]
        R7[frontend/redux/User/]
        R8[Passport.js middleware]
        R9[Express sessions]
    end
    
    subgraph "CURRENT Architecture ✅"
        C1[Frontend] --> C2[Socket.IO Client]
        C2 --> C3[WebRTC PeerContext]
        C3 --> C4[UserVideo Components]
        
        C5[Backend] --> C6[Socket.IO Server]
        C6 --> C7[Room Management]
        C7 --> C8[Video Queue API]
        
        C9[Redux Store] --> C10[Room State]
        C10 --> C11[Video Queue]
        C11 --> C12[Now Playing]
    end
    
    style R1 fill:#ffcdd2,stroke:#f44336
    style R2 fill:#ffcdd2,stroke:#f44336
    style R3 fill:#ffcdd2,stroke:#f44336
    style R4 fill:#ffcdd2,stroke:#f44336
    style R5 fill:#ffcdd2,stroke:#f44336
    style R6 fill:#ffcdd2,stroke:#f44336
    style R7 fill:#ffcdd2,stroke:#f44336
    style R8 fill:#ffcdd2,stroke:#f44336
    style R9 fill:#ffcdd2,stroke:#f44336
    
    style C3 fill:#e8f5e8
    style C6 fill:#e8f5e8
    style C11 fill:#e8f5e8
```

## Cleanup Results

- **Removed 8+ Auth Files**: Complete elimination of authentication system
- **Simplified Dependencies**: Removed passport, express-session, connect-session-sequelize
- **Streamlined Routes**: Direct focus on room and video functionality
- **Clean Architecture**: No authentication overhead, pure karaoke app functionality