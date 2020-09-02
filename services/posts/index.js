const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash-core');

const app = express();

app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const id = _.uniqueId();
  const newPost = {
    id,
    title,
    content,
  };
  posts[id] = newPost;
  res.status(201).send(newPost);
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
