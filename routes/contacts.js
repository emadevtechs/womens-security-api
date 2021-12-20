require("dotenv").config();
var express = require('express');
var router = express.Router();
var { CheckUser } = require('../db/checkJwt');

const { getContacts, getContactsByUserId, createContacts, updateContacts } = require("../models/contacts");

/* CREATE user. */
router.post("/", function (req, response) {
    createContacts(req.body, function (err, res) {
    if (err) {
      response.send({
        message: err,
        data: null
      });
    } else {
      response.send({
        message: "Create Contacts Successfully",
        data: res
      });
    }
  })
});

/* GET users listing. */
router.get('/', CheckUser, function(req, res, next) {
  getContacts(null, function (err, response) {
    if (err) {
      res.send({
        message: err,
        data: null
      });
    } else {
      res.send({
        message: "Get Contacts Successfully",
        data: response
      });
    }
  })
});

/* GET specific user. */
router.get("/:id", CheckUser, function (req, response) {
  var data = { user_id: req.params.user_id };
  getContactsByUserId(data, function (err, res) {
    if (err) {
      response.send({
        message: err,
        data: null
      });
    } else {
      response.send({
        message: "Get Contacts By User ID Successfully",
        data: res
      });
    }
  })
});

router.put("/:id", CheckUser, function (req, response) {
  updateContacts({ user_id: req.params.user_id, ...req.body}, function (err, res) {
    if (err) {
      response.send({
        message: err,
        data: null
      });
    } else {
      response.send({
        message: "Update Contacts Successfully",
        data: res
      });
    }
  })
});

module.exports = router;
