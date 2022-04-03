/*
 *
 * Server Files
 *
 */

// Imports
const c = require("./config.json");
const util = require("./utils/util");

// Initialize
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const cors = require("cors");
const { validate } = require("json-schema");
const { resolveSrv } = require("dns/promises");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(index);
app.use(bodyParser.json());
app.options("/api/*", cors()); // enable pre-flight request for DELETE request
let lobbies = {
    0: {
        players: [],
        num_players: 3,
        rake: "50000000000000000",
        buy_in: "1000000000000000000",
    },
    1: {
        players: [],
        num_players: 5,
        rake: "50000000000000000",
        buy_in: "2000000000000000000",
    },
    2: {
        players: [],
        num_players: 10,
        buy_in: "1000000000000000000",
        rake: "100000000000000000",
    },
};

function validateTransaction(receipt, account) {
    // TODO: validate transaction signature with crypto lib
    let isValid = true;
    if (isValid) return;
    else throw new Error("invalid transaction receipt");
}

app.get("/api/lobbies", function (req, res) {
    res.json(lobbies);
});

app.get("/api/lobbies/:lobbyID", function (req, res) {
    res.json(lobbies[req.params.lobbyID]);
});

app.post("/api/lobbies/:lobbyID/join", function (req, res) {
    let lobbyID = req.params.lobbyID;
    console.log(req.body);
    let { transactionReceipt, account } = req.body;
    validateTransaction(transactionReceipt, account);
    lobbies[lobbyID].players.push(account);
    lobbies[lobbyID].players = [...new Set(lobbies[lobbyID].players)];
    res.sendStatus(200);
});

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*:3000",
        methods: ["GET", "POST"],
    },
});

let interval;

io.on("connection", (socket) => {
    // Set Client States
    var currentPlayer = {
        id: socket.id,
        walletId: null,
    };

    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);

    socket.on("playerLogin", function (data) {
        currentPlayer.walletId = data.acc;
        console.log("Player Wallet", currentPlayer.walletId);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

const requestWallet = (socket) => {};

const getApiAndEmit = (socket) => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
