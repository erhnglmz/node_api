const express = require("express");
const router = express.Router();
//Models
const ModelMovie = require("../models/Movie.js");

/* GET movie listing. */
router.get("/", (req, res) => {
  ModelMovie.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

/* GET movie by id listing. */
router.get("/getById", (req, res, next) => {
  const movieId = ModelMovie.findById(req.body._id);
  movieId
    .then((movie) => {
      if (!movie) next({ message: "Filim bulunamadı.", code: 404 });

      res.json(movie);
    })
    .catch((err) => {
      res.json(err);
    });
});

/* GET movie by id listing. */
router.get("/:_id", (req, res, next) => {
  const movieId = ModelMovie.findById(req.params._id);
  movieId
    .then((movie) => {
      if (!movie) next({ message: "Filim bulunamadı.", code: 404 });

      res.json(movie);
    })
    .catch((err) => {
      res.json(err);
    });
});

/* POST movie listing. */
router.post("/", (req, res) => {
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

/* PUT movie listing. */
router.put("/:_id", (req, res, next) => {
  const movieId = ModelMovie.findByIdAndUpdate(req.params._id, req.body, {
    new: true
  });
  movieId
    .then((movie) => {
      if (!movie) next({ message: "Filim bulunamadı.", code: 404 });

      res.json({ status: 200, data: movie });
    })
    .catch((err) => {
      res.json(err);
    });
});

/* PUT movie listing. */
router.delete("/:_id", (req, res, next) => {
  const movieId = ModelMovie.findByIdAndRemove(req.params._id);
  movieId
    .then((movie) => {
      if (!movie) next({ message: "Filim bulunamadı.", code: 404 });

      res.json({ status: 200 });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
