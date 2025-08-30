const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const app = express(); // instance to express module
const db = require('./db');
const PORT = process.env.PORT || 4000; //Port number for socket

// const EXPPORT = 4100; //Port number for express
const http = require('http').Server(app);
const cors = require('cors');
// Note: when using credentials we cannot use '*', put the name of the domain on deployment
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const sessionStore = new SequelizeStore({ db });

app.use(cors());

const bodyParser = require('body-parser');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Configs
const configSession = () => ({
  secret: 'karaokeapp',
  store: sessionStore,
  resave: false,
  cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 hours in ms
  saveUninitialized: false,
});

// Middleware Setup - Users
app.use(session(configSession()));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const { User } = require('./db/models/user');

// Mount on API
app.use('/api', require('./api'));
// Mount on Auth
app.use('/auth', require('./auth'));

// ---------------------USER AUTHORIZATION---------------------

// Pass user into Passport
const serializeUser = (user, done) => {
  console.log('USER SESSION: ', user);
  done(null, user);
};
const deserializeUser = async (userInfo, done) => {
  console.log('USER ID: ', userInfo)
  try {
    const user = await db.models.User.findByPk(userInfo.id);
    done(null, user);
  } catch (error) {
    done(error);
  }
};

// const setUpMiddleware = app => {

//   return app;
// }

// Passport Setup
const setUpPassport = () => {
  passport.serializeUser(serializeUser); // Add user from session
  passport.deserializeUser(deserializeUser); // Remove user from session
};

// Routes
// const setUpRoutes = app => {
//   app.use("/api", require("./api"));
//   app.use("/auth", require("./auth"));
// }

// Start server and sync db
// const startServer = async (app, PORT) => {
//   await db.sync();
//   app.list(PORT, () => console.log(`Server is on port: ${PORT}`));
//   return app;
// }

// Configure all functions
const configureApp = async (PORT) => {
  setUpPassport();
  // setUpMiddleware(app);
  await sessionStore.sync();
  // setUpRoutes(app);
  // return startServer(app, port);
};

// ---------------------SOCKET CONNECTION---------------------

const roomParticipants = {};
const roomStates = {};
var room;

// Heartbeat system
const heartbeatInterval = 30000;
const reconnectBackoff = {
  initial: 1000,
  max: 30000,
  multiplier: 1.5
};

io.on('connection', (socket) => {
  var peerId;
  let heartbeatTimer;
  let reconnectAttempts = 0;

  // Start heartbeat
  const startHeartbeat = () => {
    heartbeatTimer = setInterval(() => {
      socket.emit('ping');
    }, heartbeatInterval);
  };

  socket.on('pong', () => {
    reconnectAttempts = 0;
  });

  startHeartbeat();


  // Create room
  // console.log('SOCKET', socket.id);
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
    room = roomId;
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

    socket.to(room).emit('existing-participants', roomParticipants[data.room]);
  });

  // Request room state on reconnect
  socket.on('request_room_state', (roomId) => {
    if (roomStates[roomId]) {
      socket.emit('room_state', roomStates[roomId]);
    }
  });
  //   socket.on('join_room', (roomId, userId) => {
  //     console.log(roomId, userId)
  //     socket.join(roomId)
  //     console.log(`${userId} has joined room ${roomId}`)
  //     socket.to(roomId).emit('user-connected', userId)
  //     peerId = userId;
  // });

  socket.on('disconnect', () => {
    clearInterval(heartbeatTimer);
    console.log("What room I'm emitting to" , room)
    console.log('A user disconnected', peerId);
    io.to(room).emit('user-disconnected', peerId);

    // Remove the disconnected user from the room's participants list
    for (let roomId in roomParticipants) {
      roomParticipants[roomId] = roomParticipants[roomId].filter(
        (participant) => participant.id !== peerId
      );
      // Update room state
      if (roomStates[roomId]) {
        roomStates[roomId].participants = roomParticipants[roomId];
      }
    }
  });

  // Handle links
  // socket.on('link', (data) => {
  //   //console.log("data: ", data)
  //   //console.log("socket.room: ", socket.rooms)

  //   io.to(data.room).emit('link', data.link);
  // });

  // Debounced video controls
  const pauseResumeDebounce = new Map();
  
  socket.on('on_resume', (data) => {
    const key = `${data.roomId}_resume`;
    if (pauseResumeDebounce.has(key)) {
      clearTimeout(pauseResumeDebounce.get(key));
    }
    
    pauseResumeDebounce.set(key, setTimeout(() => {
      console.log('data for resume: ', data.roomId);
      io.to(data.roomId).emit('resume', data.roomId);
      pauseResumeDebounce.delete(key);
    }, 300));
  });

  socket.on('on_pause', (data) => {
    const key = `${data.roomId}_pause`;
    if (pauseResumeDebounce.has(key)) {
      clearTimeout(pauseResumeDebounce.get(key));
    }
    
    pauseResumeDebounce.set(key, setTimeout(() => {
      console.log('data for pause: ', data.roomId);
      io.to(data.roomId).emit('pause', data.roomId);
      pauseResumeDebounce.delete(key);
    }, 300));
  });

  socket.on('get_video', (data) => {
    console.log('data for get_video: ', data);
    console.log('Listening for get_video');
    console.log('IO ADAPTER ROOMS', io.sockets.adapter.rooms);
    io.to(data.room).emit('sync_video', data.link);
  });

  // Throttled participant and queue updates
  const updateThrottle = new Map();
  
  socket.on('vid_info', (data) => {
    const key = `${data.room}_vid_info`;
    if (updateThrottle.has(key)) return;
    
    updateThrottle.set(key, true);
    setTimeout(() => updateThrottle.delete(key), 1000);
    
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
    const key = `${data.roomId}_add_queue`;
    if (updateThrottle.has(key)) return;
    
    updateThrottle.set(key, true);
    setTimeout(() => updateThrottle.delete(key), 1000);
    
    console.log('data for add_to_queue: ', data.roomId);
    io.to(data.roomId).emit('add_to_queue', data.roomId);
  });

  socket.on('remove_from_queue', (data) => {
    const key = `${data.roomId}_remove_queue`;
    if (updateThrottle.has(key)) return;
    
    updateThrottle.set(key, true);
    setTimeout(() => updateThrottle.delete(key), 1000);
    
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
    // This listener is dependent on the one who creates the room. The room id is from 'create_room' listener
    console.log('ROOM', room);
    console.log('id', id);
    if (id === room) {
      io.to(room).emit('leave_room', () => {
        console.log('Emitting leave room everyone in room');
      });
      io.to(room).disconnectSockets();
    } else {
      socket.emit('leave_room');
      socket.disconnect();
    }

    // console.log(`user ${id} has left room`);
  });
  socket.on('send_message', (data) => {
    io.to(data.roomId).emit('receive_message', {
      message: data.message,
      username: data.username,
    });
  });
});

console.log('User Room', io.adapter.rooms);

// Potential sync, place db.sync({force: true }) to nuke data
const syncDB = () => db.sync();

// Start the server
// const runServer = () => {
//   app.listen(EXPPORT, () => {
//     console.log(`Live on port: ${EXPPORT}`);
//   });
// };

const runHttp = () => {
  http.listen(PORT, () => {
    console.log(`Live on port: ${PORT}`);
  });
};

/// root route
app.get('/', (req, res) => {
  res.send({ status: 200 });
});

syncDB();
// runServer();
runHttp();

(module.exports = app), configureApp(PORT);
