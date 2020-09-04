import React from 'react';

// eslint-disable-next-line react/prop-types
const Comment = ({ comment }) => {
  const { content, status } = comment;
  const message = () => {
    switch (status) {
      case 'rejected':
        return 'Comment rejected by moderator.';
      case 'approved':
        return content;
      default:
        return 'Comment currently under moderation';
    }
  };
  return (
    <li className="li">
      <p className="content">{message()}</p>
    </li>
  );
};

export default Comment;
