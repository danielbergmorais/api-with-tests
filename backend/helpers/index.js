const isUUID = require("./checkUUID");
const isTokenExpired = require("./checkToken");
const isValidEmail = require("./checkEmail");

module.exports = {
    isUUID,
    isTokenExpired,
    isValidEmail
};