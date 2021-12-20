require("dotenv").config();
var express = require('express');
var router = express.Router();
var {CheckUser} = require('../db/checkJwt');

const { getUsers, getUser, createUser, deleteUser, updateUser, updateUserPassword } = require("../models/users");

/* CREATE user. */
router.post("/", function (req, response) {
    createUser(req.body, function (err, res) {
    if (err) {
      response.send({
        message: err,
        data: null
      });
    } else {
      response.send({
        message: "Create User Successfully",
        data: res
      });
    }
  })
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  getUsers(null, function (err, response) {
    if (err) {
      res.send({
        message: err,
        data: null
      });
    } else {
      res.send({
        message: "Get Users Successfully",
        data: response
      });
    }
  })
});

/* GET specific user. */
router.get("/:id", CheckUser, function (req, response) {
  var data = { id: req.params.user_id };
  getUser(data, function (err, res) {
    if (err) {
      response.send({
        message: err,
        data: null
      });
    } else {
      response.send({
        message: "Get User Successfully",
        data: res
      });
    }
  })
});

router.put("/:id", CheckUser, function (req, response) {
  updateUser({ id: req.params.user_id, ...req.body}, function (err, res) {
    if (err) {
      response.send({
        message: err,
        data: null
      });
    } else {
      response.send({
        message: "Update User Successfully",
        data: res
      });
    }
  })
});

router.put("/updatePassword/:id", CheckUser, function (req, response) {
  updateUserPassword({ id: req.params.user_id, ...req.body }, function (err, res) {
    if (err) {
      response.send({
        message: err,
        data: null
      });
    } else {
      response.send({
        message: "Update User Password Successfully",
        data: res
      });
    }
  })
});

router.delete("/:id", CheckUser, function (req, response) {
  deleteUser({ id: req.params.user_id }, function (err, res) {
    if (err) {
      response.send({
        message: err,
        data: null
      });
    } else {
      response.send({
        message: "Delete User Successfully",
        data: res
      });
    }
  })
});

module.exports = router;
