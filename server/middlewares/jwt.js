const jwt = require("jsonwebtoken");

const generateAccessToken = (uid, email) =>
  jwt.sign({ _id: uid, email }, process.env.JWT_SECRET, { expiresIn: "1d" });

const generateRefreshToken = (uid) =>
  jwt.sign({ _id: uid }, process.env.JWT_SECRET, { expiresIn: "3d" });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
