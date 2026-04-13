const crypto = require("crypto");

function signMessage(message, privateKey) {
    const sign = crypto.createSign("SHA256");
    sign.update(message);
    sign.end();
    return sign.sign(privateKey, "hex");
}

function verifySignature(message, signature, publicKey) {
    const verify = crypto.createVerify("SHA256");
    verify.update(message);
    verify.end();
    return verify.verify(publicKey, signature, "hex");
}

module.exports = { signMessage, verifySignature };