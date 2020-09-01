const express = require("express");
const server = express();
const postsRouter = require('./posts/posts-router')

server.use(express.json());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
    res.status(200).json({message: "the server is running on localhost:3002"})
  res.send(`<h2>Welcome To Posts</h2>`);
});

const port = 3002;
server.listen(port, () => console.log("server is up...."));
