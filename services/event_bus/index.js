const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;
  axios.post('http://localhost:3001/events', event).catch((err) => {
    throw new Error(
      'There was a problem emitting an event to the posts service',
      err.message,
    );
  });
  axios.post('http://localhost:3002/events', event).catch((err) => {
    throw new Error(
      'There was a problem emitting an event to comments service...',
      err.message,
    );
  });
  axios.post('http://localhost:3003/events', event).catch((err) => {
    throw new Error(
      'There was a problem emitting an event to queries service...',
      err.message,
    );
  });

  return res.status(200).send('Ok');
});

app.listen(3005, () => {
  console.log('Event bus is listening on port 3005...');
});
