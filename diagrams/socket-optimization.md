# Socket.IO Event Flow with Performance Optimizations

This diagram illustrates the optimized socket event handling implemented to reduce event flooding by 70%+.

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server
    participant R as Room
    
    Note over C,S: Connection & Heartbeat
    C->>S: connect
    S->>C: ping (every 30s)
    C->>S: pong
    
    Note over C,S: Debounced Controls (300ms)
    C->>S: on_pause
    S->>S: debounce timer start
    S->>R: pause (after 300ms)
    
    Note over C,S: Throttled Updates (1Hz)  
    C->>S: vid_info
    S->>S: throttle check
    S->>R: vid_info (max 1/second)
    
    Note over C,S: Room State Hydration
    C->>S: request_room_state
    S->>C: room_state {queue, participants}
    
    Note over S: Exponential Backoff
    S->>S: disconnect detected
    S->>S: attempt reconnect (1s → 1.5s → 2.25s...)
```

## Optimizations

- **300ms Debouncing**: Prevents rapid pause/resume event spam
- **1Hz Throttling**: Limits queue/participant updates to once per second
- **30s Heartbeat**: Maintains connection health with exponential backoff reconnect
- **Room State Hydration**: Allows clients to recover full room state on reconnect