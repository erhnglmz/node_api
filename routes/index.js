const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Models
const ModelUser = require("../models/User");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.post("/register", (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    const user = new ModelUser({
      username: username,
      password: hash
    });

    const userSave = user.save();
    userSave
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

router.post("/auth", (req, res) => {
  const { username, password } = req.body;

  ModelUser.findOne(
    {
      username
    },
    (err, user) => {
      if (err) {
        throw err;
      }
      if (!user) {
        res.json({ status: false, message: "User not found" });
      } else {
        bcrypt.compare(password, user.password).then((result) => {
          if (!result) {
            res.json({ status: false, message: "Password is wrong" });
          } else {
            const payload = {
              username
            };
            const token = jwt.sign(
              payload,
              req.app.get("api_secret_key"),
              {
                expiresIn: 720
              }
            );
            res.json({ status: true, token });
          }
        });
      }
    }
  );
});

module.exports = router;
