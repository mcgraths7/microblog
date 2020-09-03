const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const _ = require('lodash-core');

const app = express();

app.use(bodyParser.json());

const BLACKLIST = ['orange', 'chocolate', 'duke'];

const moderateComment = (comment) => {
  const newComment = { ...comment };
  const contentArr = newComment.content.split(' ').map((word) => _.trim(word));
  if (_.intersection(contentArr, BLACKLIST).length > 0) {
    newComment.status = 'rejected';
  } else {
    newComment.status = 'approved';
  }
  return newComment;
};

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentCreated') {
    const moderatedComment = moderateComment(data);
    await axios
      .post('http://localhost:3005/events', {
        type: 'CommentModerated',
        data: moderatedComment,
      })
      .catch((err) => {
        throw new Error('There was a problem.', err.message);
      });
    console.log('Emitted event: CommentModerated');
  }
  res.status(200).send('Ok');
});

app.listen(3004, () => {
  console.log('Moderation service is listening on port 3004...');
});
