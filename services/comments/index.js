const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

const commentsByPostId = {};

app.use(bodyParser.json());
app.use(cors());

app.post('/posts/:postId/comments', async (req, res) => {
  const { id, content } = req.body;
  const { postId } = req.params;
  const newComment = {
    id,
    content,
  };
  if (commentsByPostId[postId]) {
    commentsByPostId[postId] = [...commentsByPostId[postId], newComment];
  } else {
    commentsByPostId[postId] = [newComment];
  }

  await axios
    .post('http://localhost:3005/events', {
      type: 'CommentCreated',
      data: {
        postId: req.params.postId,
        id: req.body.id,
        content: req.body.content,
        status: 'pending',
      },
    })
    .catch((err) => {
      throw new Error(
        'There was a problem emitting the CommentCreated event: ',
        err.message,
      );
    });
  console.log('Event emitted: CommentCreated');

  res.status(201).send('Ok');
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const {
      postId, id, content, status,
    } = data;
    const postComments = commentsByPostId[postId];
    const comment = postComments.find((c) => c.id === id);
    comment.status = status;
    await axios.post('http://localhost:3005/events', {
      type: 'CommentUpdated',
      data: {
        postId,
        id,
        content,
        status,
      },
    });
    console.log('Event emitted: CommentUpdated');
  }
  res.status(200).send('Ok');
});

app.listen(3002, () => {
  console.log('Comments server is listening on port 3002...');
});
