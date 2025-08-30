const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const http = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple in-memory storage for rooms
const roomParticipants = {};
const roomStates = {};

io.on('connection', (socket) => {
  var peerId;
  let heartbeatTimer;

  // Start heartbeat
  const startHeartbeat = () => {
    heartbeatTimer = setInterval(() => {
      socket.emit('ping');
    }, 30000);
  };

  socket.on('pong', () => {
    // Reset reconnect attempts
  });

  startHeartbeat();

  // Create room
  socket.on('create_room', (roomId, username) => {
    socket.join(roomId);
    console.log(`User created room: ${roomId}`);
    socket.emit('room-created', username);
    console.log('username: ', username);

    if (!roomParticipants[roomId]) {
      roomParticipants[roomId] = [];
    }
    roomParticipants[roomId].push({ name: username });
    socket.emit('existing-participants', roomParticipants[roomId]);
  });

  // Join room
  socket.on('join_room', (data, id) => {
    socket.join(data.room);
    console.log(`${id} joined room: ${data.room}`);
    const username = data.name.trim() || 'Anonymous';
    socket.to(data.room).emit('user-connected', id, username);
    peerId = id;
    console.log('PeerID: ', peerId);
    socket.emit('room-created', username);

    if (!roomParticipants[data.room]) {
      roomParticipants[data.room] = [];
    }
    roomParticipants[data.room].push({ id: id, name: username });

    // Initialize or update room state
    if (!roomStates[data.room]) {
      roomStates[data.room] = {
        queue: [],
        currentVideo: null,
        participants: []
      };
    }
    roomStates[data.room].participants = roomParticipants[data.room];

    socket.to(data.room).emit('existing-participants', roomParticipants[data.room]);
  });

  // Request room state on reconnect
  socket.on('request_room_state', (roomId) => {
    if (roomStates[roomId]) {
      socket.emit('room_state', roomStates[roomId]);
    }
  });

  socket.on('disconnect', () => {
    clearInterval(heartbeatTimer);
    console.log('A user disconnected', peerId);
    
    // Remove the disconnected user from all rooms
    for (let roomId in roomParticipants) {
      roomParticipants[roomId] = roomParticipants[roomId].filter(
        (participant) => participant.id !== peerId
      );
      if (roomStates[roomId]) {
        roomStates[roomId].participants = roomParticipants[roomId];
      }
    }
  });

  // Video controls
  socket.on('on_resume', (data) => {
    console.log('data for resume: ', data.roomId);
    io.to(data.roomId).emit('resume', data.roomId);
  });

  socket.on('on_pause', (data) => {
    console.log('data for pause: ', data.roomId);
    io.to(data.roomId).emit('pause', data.roomId);
  });

  socket.on('get_video', (data) => {
    console.log('data for get_video: ', data);
    io.to(data.room).emit('sync_video', data.link);
  });

  socket.on('vid_info', (data) => {
    io.to(data.room).emit('vid_info', {
      title: data.title,
      thumbnail: data.thumbnail,
      link: data.link,
    });
  });

  socket.on('is_playing', (data) => {
    console.log('data for is_playing: ', data.roomId);
    io.to(data.roomId).emit('is_playing', data.roomId);
  });

  socket.on('is_ended', (data) => {
    console.log('data for is_ended: ', data.roomId);
    io.to(data.roomId).emit('end', data.roomId);
  });

  socket.on('is_empty', (data) => {
    console.log('data for is_empty: ', data.roomId);
    io.to(data.roomId).emit('is_empty', data.roomId);
  });

  socket.on('add_to_queue', (data) => {
    console.log('data for add_to_queue: ', data.roomId);
    io.to(data.roomId).emit('add_to_queue', data.roomId);
  });

  socket.on('remove_from_queue', (data) => {
    console.log('data for remove_from_queue: ', data.roomId);
    io.to(data.roomId).emit('remove_from_queue', data.roomId);
  });

  socket.on('remove_video', (data) => {
    io.to(data.roomId).emit('remove_video', {
      videoLink: data.videoLink,
      roomId: data.roomId,
    });
  });

  socket.on('leave_room', (id) => {
    console.log('id', id);
    socket.emit('leave_room');
    socket.disconnect();
  });

  // Chat message handling
  socket.on('send_message', (data) => {
    console.log('Received message:', data);
    console.log('Broadcasting to room:', data.roomId);
    io.to(data.roomId).emit('receive_message', {
      message: data.message,
      username: data.username,
    });
  });
});

// Root route
app.get('/', (req, res) => {
  res.send({ status: 200, message: 'Video Chat Server Running' });
});

// Start the server
http.listen(PORT, () => {
  console.log(`Video Chat Server running on port: ${PORT}`);
  console.log(`No database required - using in-memory storage`);
});
