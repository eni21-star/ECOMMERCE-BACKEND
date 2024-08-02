const express = require('express');
const session = require("express-session");
const redis = require("redis");
const redisStore = require("connect-redis").default;

const redisClient = redis.createClient({
    socket: {
        port: 6379,
        host: "127.0.0.1"
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
