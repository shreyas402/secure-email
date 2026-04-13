const express = require("express");
const crypto = require("crypto");

const { encryptAES } = require("../crypto/aes");
const { encryptKey } = require("../crypto/rsa");
const { signMessage } = require("../crypto/signature");

const router = express.Router();

router.post("/", (req, res) => {

    const { message } = req.body;

    const aesKey = crypto.randomBytes(32);

    const encryptedMessage = encryptAES(message, aesKey);
    const encryptedKey = encryptKey(aesKey, req.receiverPublicKey);
    const signature = signMessage(message, req.senderPrivateKey);

    res.json({
        encryptedMessage,
        encryptedKey,
        signature,
        senderPublicKey: req.senderPublicKey
    });
});

module.exports = router;