/* eslint-disable react/prop-types */
import React from 'react';
import _ from 'lodash-core';
import Comment from './Comment';

const CommentContainer = ({ comments }) => {
  const commentItems = _.map(comments, (comment) => (
    <Comment key={comment.id} id={comment.id} content={comment.content} />
  ));

  return (
    <div className="content">
      <ul className="ul">
        {commentItems}
      </ul>
    </div>
  );
};

export default CommentContainer;
