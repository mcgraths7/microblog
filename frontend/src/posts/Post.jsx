import React, { useState } from 'react';
import _ from 'lodash-core';
import CommentForm from '../comments/CommentForm';
import CommentContainer from '../comments/CommentContainer';

// eslint-disable-next-line react/prop-types
const Post = ({ id, title, content }) => {
  const [comments, setComments] = useState([]);

  const addComment = (commentContent) => {
    const newComment = {
      id: _.uniqueId(),
      content: commentContent,
    };
    setComments([...comments, newComment]);
  };

  return (
    <div className="column is-half">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title message">{`${id}. ${title}`}</p>
        </header>
        <section className="card-content">
          <div className="content">{content}</div>
        </section>
        <hr className="hr" />
        <section className="card-content">
          <CommentContainer comments={comments} />
        </section>
        <footer className="card-content">
          <CommentForm addComment={addComment} />
        </footer>
      </div>
    </div>
  );
};

export default Post;
