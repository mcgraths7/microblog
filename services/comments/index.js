const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const commentsRepo = require('./commentsRepo');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/posts/:postId/comments', async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;

  const comment = await commentsRepo.create({ content, postId });
  console.log('Comment created', comment.id);

  await axios
    .post('http://event-bus-clusterip-srv:3005/events', {
      type: 'CommentCreated',
      data: {
        postId: comment.postId,
        id: comment.id,
        content: comment.content,
        status: comment.status,
      },
    })
    .catch((err) => {
      throw new Error(
        'There was a problem emitting the CommentCreated event: ',
        err.message,
      );
    });

  res.status(201).send(comment);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const {
      postId, id, content, status,
    } = data;
    await commentsRepo.update(id, {
      postId, id, content, status,
    });
    await axios.post('http://event-bus-clusterip-srv:3005/events', {
      type: 'CommentUpdated',
      data: {
        postId,
        id,
        content,
        status,
      },
    });
  }
  res.status(200).send('Ok');
});

app.listen(3002, () => {
  console.log('Comments server is now listening on port 3002...');
});
