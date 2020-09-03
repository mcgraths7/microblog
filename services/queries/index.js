const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.status(200).send('Ok');
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
  } else if (type === 'CommentCreated') {
    if (posts[data.postId]) {
      posts[data.postId].comments.push({
        id: data.id,
        content: data.content,
        status: data.status,
      });
    }
  } else if (type === 'CommentUpdated') {
    const origComments = posts[data.postId].comments;
    const editedComments = origComments.map((comment) => {
      if (comment.id === data.id) {
        return {
          ...data,
        };
      }
      return comment;
    });
    posts[data.postId].comments = [...editedComments];
    console.log('Event emitted: CommentUpdated');
  }
  res.status(200).send('Ok');
});

app.listen(3003, () => {
  console.log('Query service listening on port 3003...');
});
