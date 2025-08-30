# Getting Started

## Prerequisites
- Node.js 16+
- PostgreSQL database
- YouTube API key

## Installation

### Backend Setup
```bash
cd backend
npm install
```

### Environment Variables
Create `backend/.env`:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/karaokeapp
YOUTUBE_API_KEY=your_youtube_api_key
PORT=4000
```

### Database Setup
```bash
# Start PostgreSQL service
# Create database 'karaokeapp'
npm run dev  # Auto-syncs database tables
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_BACKEND_URL=http://localhost:4000
```

## Running the Application

### Development Mode
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### Production Build
```bash
cd frontend
npm run build

cd backend
npm start
```

## Usage

1. **Create Room**: Enter username and create a new room
2. **Join Room**: Use room ID to join existing room
3. **Add Videos**: Search YouTube videos and add to queue
4. **Video Chat**: Camera/mic controls in bottom panel
5. **Queue Management**: Add, remove, and advance through video queue

## Architecture Overview

- **Frontend**: React + Redux running on Vite dev server
- **Backend**: Express server with Socket.IO for real-time features
- **Database**: PostgreSQL with Sequelize ORM
- **WebRTC**: PeerJS for video chat connections
- **Video**: YouTube API for search and metadata

## Key Directories

```
KaraokeApp/
├── frontend/src/
│   ├── components/Karaoke/    # Main karaoke UI
│   ├── redux/                 # State management
│   └── PeerContext.tsx        # WebRTC management
├── backend/
│   ├── api/                   # REST routes
│   ├── db/                    # Database models
│   └── index.js               # Main server + Socket.IO
├── diagrams/                  # Architecture diagrams
└── docs/                      # Documentation
```