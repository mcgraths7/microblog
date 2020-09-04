/* eslint-disable object-curly-newline */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const _ = require('lodash-core');

const queriesRepo = require('./queriesRepo');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const handleEvent = async (type, data) => {
  console.log('Processing', type);
  console.log(`Data: ${data}`);
  if (type === 'PostCreated') {
    const { title, content } = data;
    await queriesRepo.addPost({
      title,
      content,
    });
  } else if (type === 'CommentCreated') {
    const { postId, content } = data;
    await queriesRepo.addComment({
      postId,
      content,
    });
  } else if (type === 'CommentUpdated') {
    const { postId, id, content, status } = data;
    await queriesRepo.updateComment({
      postId,
      content,
      status,
      id,
    });
  }
};

app.get('/posts', async (req, res) => {
  const posts = await queriesRepo.getAll();
  console.log(`Sending over ${_.size(posts)} posts`);
  res.status(200).send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.status(200).send('Ok');
});

app.listen(3003, async () => {
  console.log('Query service listening on port 3003...');

  const res = await axios
    .get('http://event-bus-clusterip-srv:3005/events')
    .catch((err) => {
      throw new Error(
        'There was a problem getting events from the event bus',
        err.message,
      );
    });
  res.data.map((event) => handleEvent(event.type, event.data));
});
