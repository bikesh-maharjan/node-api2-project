const express = require("express");
const router = express.Router();
const Posts = require("../data/db");

router.get("/", (req, res) => {
  Posts.find()
    .then((post) => {
      res.status(200).json({ hello: "world" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "the post inforamtion could not be retrieved " });
    });
});

module.exports = router;
