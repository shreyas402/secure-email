const express = require("express");

const { decryptAES } = require("../crypto/aes");
const { decryptKey } = require("../crypto/rsa");
const { verifySignature } = require("../crypto/signature");

const router = express.Router();

router.post("/", (req, res) => {

    let { encryptedMessage, encryptedKey, signature, senderPublicKey, tamper } = req.body;

    // 🔥 Tampering simulation
    if (tamper) {
        encryptedMessage = encryptedMessage.replace(/a/g, "b");
    }

    try {
        const aesKey = decryptKey(encryptedKey, req.receiverPrivateKey);
        const decryptedMessage = decryptAES(encryptedMessage, aesKey);

        const isValid = verifySignature(decryptedMessage, signature, senderPublicKey);

        res.json({
            message: decryptedMessage,
            status: isValid ? "Verified ✅" : "Tampered ❌",
            decryptedKey: aesKey.toString("hex")
        });

    } catch (err) {
        res.json({
            message: "Decryption Failed ❌",
            status: "Tampered ❌",
            decryptedKey: "Error"
        });
    }
});

module.exports = router;