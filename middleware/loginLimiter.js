const rateLimit = require('express-rate-limit')
const { logEvents } = require('./logger')

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 login request per 'window' per minute
    message:
        { message: 'Too many login attemps from this IP, please try again after 60 seconds' },
    handler : (req, res, next, options) => {
        logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.header.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standarHeaders: true, // Return rate limit info to the RateLimit-* header
    legacyHeaders: false, // Disable the X-RateLimit-* headers
})

module.exports = loginLimiter