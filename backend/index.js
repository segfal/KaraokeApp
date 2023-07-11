const express = require("express");
const db = require("./db");
const PORT = "4000"; //Port number
const cors = require("cors")

const app = express(); // instance to express module


app.use(cors());
app.use(express.json())



// Potential sync, place db.sync({force: true }) to nuke data
const syncDB = () => db.sync();


const runServer = () => {
  app.listen(PORT, () => {
    console.log(`Live on port: ${PORT}`);
  });
};

syncDB();
runServer();

module.exports = app;