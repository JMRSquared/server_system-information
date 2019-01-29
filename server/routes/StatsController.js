var express = require("express");
var router = express.Router();

import mongoose from "mongoose";
import moment from 'moment';

router.get("/", function (req, res) {
  console.log('tag', req.io)
  res.send(req.io);
});

module.exports = router;