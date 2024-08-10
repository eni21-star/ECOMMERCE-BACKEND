const express = require('express');
const session = require("express-session");
const redis = require("redis");
const redisStore = require("connect-redis").default;

const redisUrl = process.env.REDIS_URL

const redisUrlParsed = new URL(redisUrl);

const redisClient = redis.createClient({
    socket: {
        port: redisUrlParsed.port,
        host: redisUrlParsed.hostname
    }
});

redisClient.connect()
    .then(() => console.log("Connected to Redis"))
    .catch(err => console.error("Error connecting to Redis", err));

const sessionConnect = (app) => {
    app.use(session({
        secret: process.env.SECRETKEY || "hfhfhrr8488484rrhry474747",
        store: new redisStore({ client: redisClient }),
        saveUninitialized: false,
        resave: false,
        cookie: {
            httpOnly: true,
            secure: false, 
            maxAge: 600000
            
        }
    }));
};

module.exports = sessionConnect;
