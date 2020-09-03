const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;
  console.log(event);

  axios.post('http://localhost:3001/events', event).then(() => {
    console.log('Event sent to posts service');
  });
  axios.post('http://localhost:3002/events', event).then(() => {
    console.log('Event sent to comments service');
  });
  axios.post('http://localhost:3003/events', event).then(() => {
    console.log('Event sent to queries service');
  });

  res.status(200).send('Ok');
});

app.listen(3005, () => {
  console.log('Event bus is listening on port 3005...');
});
