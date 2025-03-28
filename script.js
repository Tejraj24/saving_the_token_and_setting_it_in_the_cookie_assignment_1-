require("dotenv").config();
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "your-encryption-key"; // Should be a 256-bit key

// Encrypt Function
const encrypt = (payload) => {
  // Step 1: Generate JWT token
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  // Step 2: Encrypt the token using AES
  const encryptedToken = CryptoJS.AES.encrypt(token, ENCRYPTION_KEY).toString();

  return encryptedToken;
};

// Decrypt Function
const decrypt = (token) => {
  try {
    // Step 1: Decrypt AES-encrypted token
    const bytes = CryptoJS.AES.decrypt(token, ENCRYPTION_KEY);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

    // Step 2: Verify and decode JWT
    return jwt.verify(decryptedToken, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

module.exports = {
  encrypt,
  decrypt
};