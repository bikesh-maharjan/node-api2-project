const express = require("express");
const router = express.Router();
const Posts = require("../data/db");
router.use(express.json());
// set up the router ///

/// get requests first///
router.get("/", (req, res) => {
  Posts.find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "the post inforamtion could not be retrieved " });
    });
});
router.use(errorHandler);
function errorHandler(error, req, res, next) {
  res.status(500).json(error.message);
}

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Posts.findById(id)
    .then((postbyId) => {
      if (postbyId[0]) {
        console.log(postbyId);
        res.status(200).json(postbyId);
      } else {
        res
          .status(404)
          .json({ message: "the post with specifed ID does not exist " });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "the post information could not be found" });
    });
});

router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  Posts.findPostComments(id)
    .then((commentsByPostId) => {
      res.status(200).json(commentsByPostId);
    })
    .catch((err) => {
      res
        .status(404)
        .json({ error: "the post information could not be found" });
    });
});

///POST REQUEST//

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({ errorMessage: "please provide title and contents for the post" });
  } else {
    Posts.insert(req.body)
      .then((es) => {
        res.status(201).json(req.body);
      })
      .catch((err) => {
        res.status(500).json({
          error: "there was an error saving the post to the database",
        });
      });
  }
});

router.post("/:id/comments", (req, res) => {
  const comment = req.body;
  const id = Number(req.params.id);
  comment.post_id = id;

  Posts.insertComment(comment).then((post) => {
    if (!post) {
      res.status(404).json({ errorMessage: "Not found " }).end();
    }
    if (comment.text === "") {
      res.status(400).json({ message: "Please fill out the fields" }).end();
    }
    if (comment) {
      res.status(201).json(post).end();
    } else {
      res
        .status(500)
        .json({ message: "the post with the specified ID doesn't exist " });
    }
  });
});

/// PUT REQUEST////
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const newPost = req.body;
  console.log(Posts);

  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({ errorMessage: "please provide title and contents for the post" });
  } else if (id > 0) {
    Posts.update(id, newPost)
      .then((es) => {
        res.status(200).json(newPost);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "the post information could not be modified" });
      });
  } else {
    res
      .status(404)
      .json({ message: "the post iwht the specified ID does not exist" });
  }
});

//DELETE ////

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (id > 0) {
    Posts.remove(id)
      .then((es) => {
        res.status(200).json(req.body);
      })
      .catch((err) => {
        res.status(500).json({ error: "the post could not be removed" });
      });
  } else {
    res
      .status(404)
      .json({ message: "the post with the specided ID does not exist" });
  }
});

module.exports = router;
