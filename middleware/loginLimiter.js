const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 login requests per 'window' per minute
    message: 'Too many login attempts from this IP, please try again',
    handler: (req, res, next, options) => {
        req.session.loginErrorMessage = options.message; // Store the error message in express session
        res.redirect('/login-disabled');
    },
    standardHeaders: true, // Return rate limit info to the RateLimit-* header
    legacyHeaders: false, // Disable the X-RateLimit-* headers
});

module.exports = loginLimiter;