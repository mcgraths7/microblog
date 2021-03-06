const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);
  console.log('Event received:', event.type);
  try {
    axios.post('http://posts-clusterip-srv:3001/events', event).catch((err) => {
      throw new Error(
        'There was a problem emitting an event to the posts service',
        err.message,
      );
    });
    axios
      .post('http://comments-clusterip-srv:3002/events', event)
      .catch((err) => {
        throw new Error(
          'There was a problem emitting an event to comments service...',
          err.message,
        );
      });
    axios
      .post('http://queries-clusterip-srv:3003/events', event)
      .catch((err) => {
        throw new Error(
          'There was a problem emitting an event to queries service...',
          err.message,
        );
      });
    axios
      .post('http://moderation-clusterip-srv:3004/events', event)
      .catch((err) => {
        throw new Error(
          'There was a problem emitting an event to moderation service...',
          err.message,
        );
      });
  } catch (err) {
    throw new Error('There was a problem with one of the services...', err);
  }
  return res.status(200).send('Ok');
});

app.get('/events', (req, res) => {
  res.status(200).send(events);
});

app.listen(3005, () => {
  console.log('Event bus is listening on port 3005...');
});
