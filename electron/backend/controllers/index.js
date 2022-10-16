const express = require('express');
const router = express.Router();
const healthRoutes = require("./app/healthController");
const students = require("./students");
const attendance = require("./attendance");
const courses = require("./courses");
const settings = require("./settings");
const syllabus = require("./syllabus");

module.exports = (app) => {

    router.get('/', (req, res, next) => { res.send("Timekeeper Backend") });
    router.use('/health', healthRoutes(app));
    router.use('/students', students(app));
    router.use('/attendance', attendance(app));
    router.use('/courses', courses(app));
    router.use('/settings', settings(app));
    router.use('/syllabus', syllabus(app));

    return router
}


