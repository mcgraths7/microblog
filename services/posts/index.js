const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash-core');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  const id = _.uniqueId();
  const newPost = {
    id,
    title,
    content,
  };
  posts[id] = newPost;

  try {
    await axios.post('http://localhost:3005/events', {
      type: 'PostCreated',
      data: {
        id: newPost.id,
        title: newPost.title,
        content: newPost.content,
      },
    });
  } catch (err) {
    console.log('There was a problem...', err);
  }

  res.status(201).send(newPost);
});

app.post('/events', (req, res) => {
  const event = req.body;
  if (event && event.type === 'PostCreated') {
    console.log(event.data);
  }
});

app.listen(3001, () => {
  console.log('Posts server is listening on port 3001...');
});
