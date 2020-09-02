const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash-core');

const app = express();

app.use(bodyParser.json());
app.use(cors());

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

app.listen(3001, () => {
  console.log('Posts server is listening on port 3001...');
});
