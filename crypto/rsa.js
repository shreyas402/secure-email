const crypto = require("crypto");

function encryptKey(aesKey, publicKey) {
    return crypto.publicEncrypt(publicKey, aesKey).toString("base64");
}

function decryptKey(encryptedKey, privateKey) {
    return crypto.privateDecrypt(privateKey, Buffer.from(encryptedKey, "base64"));
}

module.exports = { encryptKey, decryptKey };