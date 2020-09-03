const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.status(200).send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  if (type === 'PostCreated') {
    posts[data.id] = {
      id: data.id,
      title: data.title,
      content: data.content,
      comments: [],
    };
    console.log(posts);
    return res.status(201).send('Ok');
  } else if (type === 'CommentCreated') {
    if (posts[data.postId]) {
      posts[data.postId].comments.push({
        id: data.id,
        content: data.content,
      });
    }
    console.log(posts);
    return res.status(201).send('Ok');
  }
  console.log(posts);
  res.status(200).send('Event received');
});

app.listen(3003, () => {
  console.log('Query service listening on port 3003...');
});
