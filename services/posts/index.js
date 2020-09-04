const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const postsRepo = require('./postsRepo');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/posts/create', async (req, res) => {
  const { title, content } = req.body;
  const post = await postsRepo.create({
    title, content,
  });

  await axios
    .post('http://event-bus-clusterip-srv:3005/events', {
      type: 'PostCreated',
      data: {
        id: post.id,
        title: post.title,
        content: post.content,
        comments: post.comments,
      },
    })
    .catch((err) => {
      throw new Error(
        'There was a problem emitting the PostCreated event:',
        err.message,
      );
    });
  console.log('Post Created');
  res.status(201).send(post);
});

app.post('/events', (req, res) => {
  res.status(200).send('Ok');
});

app.listen(3001, () => {
  console.log('Posts server is listening on port 3001...');
});
