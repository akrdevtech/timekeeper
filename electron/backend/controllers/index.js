const express = require('express');
const router = express.Router();
const healthRoutes = require("./app/healthController");
const students = require("./students");
const attendance = require("./attendance");

module.exports = (app) => {

    router.get('/', (req, res, next) => { res.send("Timekeeper Backend") });
    router.use('/health', healthRoutes(app));
    router.use('/students', students(app));
    router.use('/attendance', attendance(app));

    return router
}


