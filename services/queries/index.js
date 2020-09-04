const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const _ = require('lodash-core');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  console.log('Processing', type);
  console.log(`Data: ${data}`);
  if (type === 'PostCreated') {
    const { id, title, content } = data;
    if (!posts[id]) {
      posts[id] = {
        id,
        title,
        content,
        comments: [],
      };
    }
  } else if (type === 'CommentCreated') {
    const {
      postId, id, content, status,
    } = data;
    const post = posts[postId];
    if (post) {
      const comment = post.comments.find((c) => c.id === id);
      if (!comment) {
        posts[data.postId].comments.push({
          id,
          content,
          status,
        });
      }
    }
  } else if (type === 'CommentUpdated') {
    const {
      postId, id, content, status,
    } = data;
    const post = posts[postId];
    const comment = post.comments.find((c) => c.id === id);
    comment.status = status;
    comment.content = content;
  }
  console.log(posts);
  console.log(`There are now ${_.size(posts)} posts`);
  return posts;
};

app.get('/posts', (req, res) => {
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
      throw new Error('There was a problem getting events from the event bus', err.message);
    });
  res.data.map((event) => handleEvent(event.type, event.data));
});
