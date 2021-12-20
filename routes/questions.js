var express = require('express');
var router = express.Router();
var { CheckUser } = require('../db/checkJwt');
const { getQuestions, getUserQuestion, createQuestions, updateQuestion, deleteQuestion } = require("../models/questions");

/* CREATE user. */
router.post("/", CheckUser, function (req, response) {
  createQuestions(req.body, function (err, res) {
    if (err) {
      response.send({
        message: err,
        data: null
      });
    } else {
      response.send({
        message: "Create Question Successfully",
        data: res
      });
    }
  })
});

/* GET users listing. */
router.get('/', CheckUser, function (req, res, next) {
  getQuestions(null, function (err, response) {
    if (err) {
      res.send({
        message: err,
        data: null
      });
    } else {
      res.send({
        message: "Get Questions Successfully",
        data: response
      });
    }
  })
});

/* GET specific user. */
router.get("/:id", CheckUser, function (req, response) {
  var data = { user_id: req.params.user_id };
  getUserQuestion(data, function (err, res) {
    if (err) {
      response.send({
        message: err,
        data: null
      });
    } else {
      response.send({
        message: "Get User Question Successfully",
        data: res
      });
    }
  })
});

router.put("/:id", CheckUser, function (req, response) {
  updateQuestion({ user_id: req.params.user_id, ...req.body }, function (err, res) {
    if (err) {
      response.send({
        message: err,
        data: null
      });
    } else {
      response.send({
        message: "Update Question Successfully",
        data: res
      });
    }
  })
});

router.delete("/:id", CheckUser, function (req, response) {
  var data = { user_id: req.params.user_id };
  deleteQuestion(data, function (err, res) {
    if (err) {
      response.send({
        message: err,
        data: null
      });
    } else {
      response.send({
        message: "delete Question Successfully",
        data: res
      });
    }
  })
});

module.exports = router;
