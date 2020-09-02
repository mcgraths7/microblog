/* eslint-disable react/prop-types */
import React from 'react';
import Comment from './Comment';

const CommentContainer = ({ comments }) => {
  const commentItems = comments.map((comment) => {
    console.log(comment);
    return <Comment key={comment.id} id={comment.id} content={comment.content} />;
  });
  return (
    <ul>
      {commentItems}
    </ul>
  );
};

export default CommentContainer;
