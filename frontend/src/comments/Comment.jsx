import React from 'react';

// eslint-disable-next-line react/prop-types
const Comment = ({ content }) => (
  <li className="li">
    <p className="content">{content}</p>
  </li>
);

export default Comment;
