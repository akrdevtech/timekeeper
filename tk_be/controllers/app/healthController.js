/**
 * Routes related to the health status of the application
 * @author Akhil Krishnan
 */
const express = require('express');
const route = express.Router();


module.exports = (app) => {
    route.get('/', async (req, res, nxt) => {
        res.json({
            service: "active",
        });
    });
    return route;
}
