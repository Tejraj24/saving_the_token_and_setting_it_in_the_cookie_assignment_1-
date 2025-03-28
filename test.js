const { encrypt, decrypt } = require("./script");

const payload = { id: 1, name: "Alice" };

const encryptedToken = encrypt(payload);
console.log("Encrypted Token:", encryptedToken);

const decryptedPayload = decrypt(encryptedToken);
console.log("Decrypted Payload:", decryptedPayload);