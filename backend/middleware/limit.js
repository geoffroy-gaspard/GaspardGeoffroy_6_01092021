const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 5,
    message: "Trop de tentatives de connexion. Compte bloqué pour 3 minutes"
})

module.exports = { limiter };