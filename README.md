<div style="text-align: center;">

# Welcome To Serenade 🎤
## A real-time virtual karaoke platform where you can sing and view along with anyone from the comfort of your own home ♪🏠

![singer](./sing.gif)
</div>

### To run locally, follow these steps:
``` cd frontend && npm run dev ``` 
<table>
    <tr>
    <td align="center"><a href="https://github.com/segfal"><img src="https://avatars.githubusercontent.com/u/92688849?v=4" width="100px;" alt=""/><br /></td>
    <td align="center"><a href="https://github.com/huda-ayaz"><img src="https://avatars.githubusercontent.com/u/107296362?v=4" width="100px;" alt=""/><br /></td>
    <td align="center"><a href="https://github.com/vnoel02"><img src="https://avatars.githubusercontent.com/u/125239380?v=4" width="100px;" alt=""/><br /></td>
    <td align="center"><a href="https://github.com/Unknown-Pplayer"><img src="https://avatars.githubusercontent.com/u/88214188?v=4" width="100px;" alt=""/><br /></td>
    </tr>
</table>


## Outline of the project

```bash
├── README.md
├── backend
│   ├── api
│   │   ├── index.js
│   │   ├── room.js
│   │   └── video.js
│   ├── db
│   │   ├── db.js
│   │   ├── index.js
│   │   └── models
│   │       ├── index.js
│   │       ├── room.js
│   │       └── video.js
│   ├── index.js
│   ├── index-original.js
│   ├── index-simple.js
│   ├── package.json
│   └── seed.js
├── frontend
│   ├── _redirects
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── App-original.jsx
│   │   ├── App-simple.jsx
│   │   ├── Context.tsx
│   │   ├── PeerContext.tsx
│   │   ├── assets
│   │   │   ├── logo-footer.png
│   │   │   ├── logo-name.png
│   │   │   ├── logo.png
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── Footer.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── JoinRoom.jsx
│   │   │   ├── Karaoke
│   │   │   │   ├── ChatBox
│   │   │   │   │   ├── ChatBox.css
│   │   │   │   │   └── ChatBox.jsx
│   │   │   │   ├── Participants
│   │   │   │   │   └── Participants.jsx
│   │   │   │   ├── Queue
│   │   │   │   │   ├── MusicCard.jsx
│   │   │   │   │   ├── Queue.css
│   │   │   │   │   └── Queue.jsx
│   │   │   │   ├── Room
│   │   │   │   │   └── Room.jsx
│   │   │   │   ├── Search
│   │   │   │   │   ├── Search.css
│   │   │   │   │   └── Search.jsx
│   │   │   │   ├── UserVideo
│   │   │   │   │   ├── SingleUserVideo.jsx
│   │   │   │   │   ├── User.jsx
│   │   │   │   │   ├── UserVideo.css
│   │   │   │   │   └── UserVideo.jsx
│   │   │   │   └── Video
│   │   │   │       ├── Video.css
│   │   │   │       └── Video.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── SimpleHome.jsx
│   │   ├── images
│   │   │   └── share.png
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── main-original.jsx
│   │   └── main-simple.jsx
│   │   └── redux
│   │       ├── Room
│   │       │   ├── Room.actions.js
│   │       │   ├── Room.reducer.js
│   │       │   └── Room.types.js
│   │       ├── Video
│   │       │   ├── Video.action.js
│   │       │   ├── Video.reducer.js
│   │       │   └── Video.types.js
│   │       ├── root-reducer.js
│   │       └── store.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── docs/
│   ├── README.md
│   ├── getting-started.md
│   ├── optimization-notes.md
│   ├── project-overview.md
│   └── technical-details.md
├── diagrams/
│   ├── project-summary.md
│   ├── redux-simplification.md
│   ├── socket-optimization.md
│   ├── system-cleanup.md
│   └── webrtc-architecture.md
├── package.json
└── run.sh
```

## Features

- **Real-time Video Chat**: WebRTC-powered video communication
- **Karaoke Queue**: Add and manage songs in a shared queue
- **Chat System**: Real-time messaging between participants
- **No Authentication Required**: Simply enter a room ID and start singing
- **Responsive Design**: Works on desktop and mobile devices
- **YouTube Integration**: Search and add songs from YouTube

## Quick Start

1. Clone the repository
2. Run `./run.sh` to install dependencies
3. Start the backend: `cd backend && npm run dev`
4. Start the frontend: `cd frontend && npm run dev`
5. Open your browser and join a room!

## Technology Stack

- **Frontend**: React, Redux, Socket.IO, WebRTC, Tailwind CSS
- **Backend**: Node.js, Express, Socket.IO, Sequelize
- **Database**: PostgreSQL
- **Deployment**: Railway, Netlify
