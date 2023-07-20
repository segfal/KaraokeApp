const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const passport = require("passport");
const app = express(); // instance to express module
const db = require("./db");
const PORT = 4000; //Port number
const EXPPORT = 4100; //Port number for express
const http = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const sessionStore = new SequelizeStore({  db })

// app.use("/api", require("./api"));
// // Mount on Auth
// app.use("/auth", require("./auth"))

// Socket connection

io.on("connection", (socket) => {
  // Create room
  console.log("SOCKET", socket.id);
  socket.on("createRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User created room: ${roomId}`);
  });

  // Join room
  socket.on("joinRoom", (data) => {
    socket.join(data.room);
    ///join room
    console.log(`User joined room: ${data.room}`);
  });

  // Handle links
  // socket.on('link', (data) => {
  //   //console.log("data: ", data)
  //   //console.log("socket.room: ", socket.rooms)

  //   io.to(data.room).emit('link', data.link);
  // });

  // Handle video controls
  socket.on("on_resume", (data) => {
    console.log("data for resume: ", data.roomId);
    io.to(data.roomId).emit("resume", data.roomId);
  });

  socket.on("on_pause", (data) => {
    console.log("data for pause: ", data.roomId);
    io.to(data.roomId).emit("pause", data.roomId);
  });

  socket.on("get_video", (data) => {
    console.log("data for get_video: ", data);
    console.log("Listening for get_video")
    console.log("IO ADAPTER ROOMS", io.sockets.adapter.rooms)
    io.to(data.room).emit("sync_video", data.link);

    
  });

  socket.on("vid_info", (data) => {
    io.to(data.room).emit("vid_info", {title: data.title,
      thumbnail: data.thumbnail,
      link: data.link
    
    } );
  });

  socket.on("is_playing", (data) => {
    console.log("data for is_playing: ", data.roomId);
    io.to(data.roomId).emit("is_playing", data.roomId);
  });

  socket.on("is_ended", (data) => {
    console.log("data for is_ended: ", data.roomId);
    io.to(data.roomId).emit("end", data.roomId);
  });

  socket.on("is_empty", (data) => {
    console.log("data for is_empty: ", data.roomId);
    io.to(data.roomId).emit("is_empty", data.roomId);
  });

  socket.on("add_to_queue", (data) => {
    console.log("data for add_to_queue: ", data.roomId);
    io.to(data.roomId).emit("add_to_queue", data.roomId);
  });

  socket.on("remove_from_queue", (data) => {
    console.log("data for remove_from_queue: ", data.roomId);
    io.to(data.roomId).emit("remove_from_queue", data.roomId);
  });

});

console.log("User Room",io.adapter.rooms);

// User authorization

// Pass user into Passport
const serializeUser = (user, done) => done(null, user.id); 
const deserializeUser = async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done (null, user);
  } catch (error) {
    done(error);
  }
}

// Configs
const configSession = () => ({
  secret:"karaokeapp",
  store: sessionStore,
  resave: false,
  cookie: {maxAge: 8 * 60 * 60 * 1000}, // 8 hours in ms
  saveUninitialized: false,
})

// Middleware Setup
const setUpMiddleware = app => {
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(cors());
  app.use(session(configSession()))
  app.use(passport.initialize());
  app.use(passport.session());
  return app;
}

// Passport Setup
const setUpPassport = () => {
  passport.serializeUser(serializeUser); // Add user from session
  passport.deserializeUser(deserializeUser); // Remove user from session
}

// Routes
const setUpRoutes = app => {
  app.use("/api", require("./api"));
  app.use("/auth", require("./auth"));
}

// Start server and sync db
// const startServer = async (app, PORT) => {
//   await db.sync();
//   app.list(PORT, () => console.log(`Server is on port: ${PORT}`));
//   return app;
// }

// Configure all functions
const configureApp = async(PORT) => {
  setUpPassport();
  setUpMiddleware(app);
  await sessionStore.sync()
  setUpRoutes(app);
  // return startServer(app, port);
}

// Potential sync, place db.sync({force: true }) to nuke data
const syncDB = () => db.sync();

// Start the server
const runServer = () => {
  app.listen(EXPPORT, () => {
    console.log(`Live on port: ${EXPPORT}`);
  });
};

const runHttp = () => {
  http.listen(PORT, () => {
    console.log(`Live on port: ${PORT}`);
  });
};

syncDB();
runServer();
runHttp();

module.exports = app, configureApp(PORT);
