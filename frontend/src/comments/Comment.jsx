import React from 'react';

// eslint-disable-next-line react/prop-types
const Comment = ({ content, status }) => {
  const message = () => {
    switch (status) {
      case 'pending':
        return 'Comment currently under moderation.';
      case 'rejected':
        return 'Comment rejected by moderator.';
      case 'approved':
        return content;
      default:
        return 'Unknown status';
    }
  };
  return (
    <li className="li">
      <p className="content">{message()}</p>
    </li>
  );
};

export default Comment;
