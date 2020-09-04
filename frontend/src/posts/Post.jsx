import React, { useState } from 'react';
import _ from 'lodash-core';
import CommentForm from '../comments/CommentForm';
import CommentContainer from '../comments/CommentContainer';

const Post = ({ id, title, content, postComments }) => {
  const [comments, setComments] = useState(postComments);

  const addComment = ({ comment }) => {
    setComments((previousComments) => {
      const newComments = [...previousComments];
      return [...newComments, comment];
    });
  };

  return (
    <div className="column is-half">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title message">{`${id} ${title}`}</p>
        </header>
        <section className="card-content">
          <div className="content">{content}</div>
        </section>
        <hr className="hr" />
        <section className="card-content">
          <p className="content">
            {_.isEmpty(comments)
              ? "It's too quiet... Add a comment!"
              : 'Comments:'}
          </p>
          <CommentContainer comments={comments} />
        </section>
        <footer className="card-content">
          <CommentForm addComment={addComment} postId={id} />
        </footer>
      </div>
    </div>
  );
};

export default Post;
