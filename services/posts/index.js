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
      },
    })
    .catch((err) => {
      throw new Error(
        'There was a problem emitting the PostCreated event:',
        err.message,
      );
    });
  console.log('Event emitted: PostCreated');

  res.status(201).send('Ok');
});

app.post('/events', (req, res) => {
  const { type } = req.body;
  if (type === 'PostCreated') {
    console.log('Event acknowledged: PostCreated');
  }
  res.status(200).send('Ok');
});

app.listen(3001, () => {
  console.log('Posts server is listening on port 3001...');
});
