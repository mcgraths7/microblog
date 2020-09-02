const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const _ = require('lodash-core');

const app = express();

const commentsByPostId = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts/:postId/comments', (req, res) => {
  const { postId } = req.params;
  const postComments = commentsByPostId[postId];
  if (_.isEmpty(postComments)) {
    return res.status(404).send(`No comments on post with id of ${postId}`);
  }
  console.log(commentsByPostId);
  return res.status(200).send(postComments);
});

app.post('/posts/:postId/comments', (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;
  const id = _.uniqueId();
  const newComment = {
    id,
    content,
  };
  if (commentsByPostId[postId]) {
    commentsByPostId[postId] = [...commentsByPostId[postId], newComment];
  } else {
    commentsByPostId[postId] = [newComment];
  }
  res.status(201).send(newComment);
});

app.listen(3002, () => {
  console.log('Comments server is listening on port 3002...');
});
