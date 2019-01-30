var express = require("express");
var router = express.Router();

import mongoose from "mongoose";
import moment from 'moment';
const si = require('systeminformation');

router.get("/", function(req, res) {
    res.json(timeData);
});

router.get("/time", function(req, res) {
    res.json(timeData);
});

router.get("/system", function(req, res) {
    si.system((data) => {
        res.json(data);
    });
});

router.get("/osInfo", function(req, res) {
    si.osInfo((data) => {
        res.json(data);
    });
});
router.get("/cpu", function(req, res) {
    si.cpu((data) => {
        res.json(data);
    });
});
router.get("/bios", function(req, res) {
    si.bios((data) => {
        res.json(data);
    });
});
router.get("/baseboard", function(req, res) {
    si.baseboard((data) => {
        res.json(data);
    });
});
router.get("/services", function(req, res) {
    si.services('*', (data) => {
        res.json(data);
    })
});
router.get("/currentload", function(req, res) {
    si.currentLoad((data) => {
        res.json(data);
    });
});

router.get("/processes", function(req, res) {
    si.processes((data) => {
        res.json(data);
    })
});

router.get("/mem", function(req, res) {
    si.mem((data) => {
        res.json(data);
    });
});

module.exports = router;