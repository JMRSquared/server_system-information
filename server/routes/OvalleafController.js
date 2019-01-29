var express = require("express");
var router = express.Router();

import mongoose from "mongoose";
import Ovalleaf from "../models/Ovalleaf";
import moment from 'moment';

router.get("/generate/userID", function (req, res) {
  res.json({
    userID: mongoose.Types.ObjectId()
  });
});

router.get("/get/visits", function (req, res) {

  Ovalleaf.findOne()
    .then(model => {
      if (model == null) {
        return res.status(512).send("No model");
      }
      res.json(model.visits.length);
    }).catch(err => {
      return res.status(500).send(err.message);
    });
});

router.get("/get/all/:login", function (req, res) {
  var login = req.params.login;

  Ovalleaf.findOne({
      login: login
    })
    .then(model => {
      if (model == null) {
        return res.status(512).send("Incorrect login details");
      }
      res.json(model);
    }).catch(err => {
      return res.status(500).send(err.message);
    });
});

router.post("/increase/visits/:userID", function (req, res) {
  var userID = req.params.userID;

  Ovalleaf.findOne()
    .then(model => {
      if (model == null) {
        model = new Ovalleaf({
          visits: new Array(),
          inbox: new Array(),
        });
      }

      if (model.visits.filter(v => v.id == userID && moment(new Date()).diff(moment(v.date), 'minutes') < 5).length == 0) {
        model.visits.push({
          id: userID,
          date: new Date()
        });

        model.save(function (err) {
          if (err) return res.status(512).send("Server error : " + err.message);
          res.json({
            message: "Welcome you are visitor number " + model.visits.length
          });
        });

      } else {
        res.json({
          message: "Welcome back!"
        });
      }

    }).catch(err => {
      return res.status(500).send(err.message);
    });
});

router.post("/send/message/:userID", function (req, res) {
  var userID = req.params.userID;

  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;

  Ovalleaf.findOne()
    .then(model => {
      if (model == null) {
        model = new Ovalleaf({
          visits: new Array(),
          inbox: new Array(),
        });
      }

      if (model.inbox.filter(v => v.name == name && v.email == email && v.message == message).length > 0) return res.status(512).send("Message already sent");

      model.inbox.push({
        id: userID,
        name: name,
        email: email,
        message: message
      });

      model.save(function (err) {
        if (err) return res.status(512).send("Server error : " + err.message);
        res.json({
          message: "Message sent!"
        });
      });

    }).catch(err => {
      return res.status(500).send(err.message);
    });
});

module.exports = router;