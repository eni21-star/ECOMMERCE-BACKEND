const rateLimit = require("express-rate-limit")


const sessionLimit = (app) => {

    const sessionLimiter = rateLimit({
        keyGenerator: (req) => req.session.user ? req.session.user._id : 'anonymous',
        windowMs: 5 * 60 * 1000, 
        max: 20,
        message: 'Too many requests from this session, please try again later.',
    });
 
    app.use(sessionLimiter);

}

module.exports = sessionLimit