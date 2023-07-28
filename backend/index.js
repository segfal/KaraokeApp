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

const User = require('./db/models/user');

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
const deserializeUser = async (id, done) => {
  try {
    const user = await db.models.User.findByPk(id);
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
var peerId;
var room;
io.on('connection', (socket) => {
  

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

    socket.emit('existing-participants', roomParticipants[data.room]);
  });
  //   socket.on('join_room', (roomId, userId) => {
  //     console.log(roomId, userId)
  //     socket.join(roomId)
  //     console.log(`${userId} has joined room ${roomId}`)
  //     socket.to(roomId).emit('user-connected', userId)
  //     peerId = userId;
  // });

  socket.on('disconnect', () => {
    console.log("What room I'm emitting to" , room)
    console.log('A user disconnected', peerId);
    io.to(room).emit('user-disconnected', peerId);

    // Remove the disconnected user from the room's participants list
    for (let room in roomParticipants) {
      roomParticipants[room] = roomParticipants[room].filter(
        (participant) => participant.id !== peerId
      );
    }
  });

  // Handle links
  // socket.on('link', (data) => {
  //   //console.log("data: ", data)
  //   //console.log("socket.room: ", socket.rooms)

  //   io.to(data.room).emit('link', data.link);
  // });

  // Handle video controls
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
    console.log('Listening for get_video');
    console.log('IO ADAPTER ROOMS', io.sockets.adapter.rooms);
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
