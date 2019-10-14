const crypto = require('crypto');

// NOTE: utils
module.exports = () => {
    return crypto.randomBytes(16).toString("hex");
}