const express = require("express");
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

app.use(cors());
app.use(express.json());
app.use("/api", require("./api"));

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
    io.to(data.room).emit("sync_video", data.link);
    // const currentRoom = Object.keys(io.sockets.adapter.sids[socket.id]).filter(item => item!=socket.id);
  });
});

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

module.exports = app;
