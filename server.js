const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const sendRoute = require("./routes/send");
const receiveRoute = require("./routes/receive");
const { generateKeys } = require("./crypto/keys");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

// 🔑 Generate users (User A & User B)
const userA = generateKeys();
const userB = generateKeys();

// Middleware to attach keys
app.use((req, res, next) => {
    req.senderPrivateKey = userA.privateKey;
    req.senderPublicKey = userA.publicKey;

    req.receiverPrivateKey = userB.privateKey;
    req.receiverPublicKey = userB.publicKey;

    next();
});

// Routes
app.use("/send", sendRoute);
app.use("/receive", receiveRoute);

app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});