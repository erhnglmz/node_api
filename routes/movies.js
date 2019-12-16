const express = require("express");
const router = express.Router();
//Models
const ModelMovie = require("../models/Movie.js");

/* GET movie listing. */
router.get("/", (req, res, next) => {
  ModelMovie.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

/* POST movie listing. */
router.post("/", (req, res, next) => {
  const modelMovie = new ModelMovie(req.body);
  modelMovie
    .save()
    .then((data) => {
      res.json({ status: 200, data });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
