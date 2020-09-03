const express = require("express");
const helmet = require("helmet");

const postsRouter = require("./posts/posts-router");

const server = express();

server.use(helmet());

server.use("/api/posts", postsRouter);

server.use("/greet/:name", (req, res) => {
  const greeting = process.env.GREETING || "Welcome To Your New Post";

  res.status(200).send(`<h1>${greeting} ${req.params.name}</h1>
  <p> You can post anything here and post anything  </p>
  `);
});

module.exports = server;
