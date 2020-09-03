const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const queries = {};

app.get('/queries', (req, res) => {
  res.status(200).send(queries);
});

app.post('/events', (req, res) => {
  const event = req.body;
  if (event && event.type === 'PostCreated') {
    queries[event.data.id] = {
      id: event.data.id,
      title: event.data.title,
      content: event.data.content,
      comments: [],
    };
  } else if (event && event.type === 'CommentCreated') {
    queries[event.data.postId].comments.push({
      id: event.data.id,
      content: event.data.content,
    });
  }
  console.log(queries);
});

app.listen(3003, () => {
  console.log('Query service listening on port 3003...');
});
