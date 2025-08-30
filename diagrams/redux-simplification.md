# Redux State Simplification (Phase 2)

This diagram shows the dramatic simplification of video state management, reducing complexity by ~70%.

```mermaid
graph LR
    subgraph "BEFORE - Phase 1"
        A1[video: []]
        A2[allVideos: []]
        A3[uniqueVideos: []]
        A4[vidInfo: []]
        A5[uniqueVidInfo: []]
        
        A6[Complex filtering logic]
        A7[Duplicate data across arrays]
        A8[Performance overhead]
    end
    
    subgraph "AFTER - Phase 2"
        B1[queue: []]
        B2[nowPlaying: null]
        
        B3[Simple array operations]
        B4[Single source of truth]
        B5[~70% state reduction]
    end
    
    A1 -.->|Simplified| B1
    A2 -.->|Removed| B1
    A3 -.->|Removed| B1
    A4 -.->|Merged into| B1
    A5 -.->|Merged into| B2
    
    style A6 fill:#ffcdd2
    style A7 fill:#ffcdd2
    style A8 fill:#ffcdd2
    style B3 fill:#c8e6c9
    style B4 fill:#c8e6c9
    style B5 fill:#c8e6c9
```

## Improvements

- **State Reduction**: From 5 redundant arrays to 2 simple properties
- **Single Source of Truth**: `queue` array and `nowPlaying` object eliminate data duplication
- **Simplified Actions**: Clean action types (ADD_TO_QUEUE, ADVANCE_QUEUE, etc.)
- **Performance**: Eliminated complex filtering and Set operations