/*
 *
 * Server Files
 *
 */

// Imports
const c = require('./config.json')
const util = require('./utils/util')

// Initialize
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const cors = require('cors')

const app = express();
app.use(cors())
app.use(index);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

let interval;

io.on("connection", (socket) => {

  // Set Client States
  var currentPlayer = {
    id: socket.id,
    walletId: null
  }

  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on('playerLogin', function (data) {
    currentPlayer.walletId = data.acc
    console.log("Player Wallet", currentPlayer.walletId)
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const requestWallet = socket => {

}

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
